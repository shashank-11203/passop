import { useRef, useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { addPassword, fetchPasswords, removePassword, updatePassword } from '../utils/passwordApiClient';
import { useAuth } from '../context/AuthContext';
import Spinner from '../components/Spinner';
import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';

const Manager = () => {
    const ref = useRef();
    const passwordRef = useRef();
    const [form, setForm] = useState({ site: "", username: "", password: "" });
    const [passwordArray, setPasswordArray] = useState([]);
    const [editId, setEditId] = useState(null);
    const [visiblePasswordIds, setVisiblePasswordIds] = useState([]);
    const { user, loading } = useAuth();


    useEffect(() => {
        const getPasswords = async () => {
            try {
                const passwords = await fetchPasswords()
                if (Array.isArray(passwords)) {
                    setPasswordArray(passwords);
                } else {
                    setPasswordArray([]);
                }
                setPasswordArray(passwords)
            } catch (err) {
                console.log('failed to load passwords', err)
            }
        }
        getPasswords()
    }, []);

    if (loading) return <Spinner />;

    const copyText = async (text) => {
        try {
            await navigator.clipboard.writeText(text);
            toast.success("Copied!", { theme: "dark" });
        } catch (err) {
            toast.error("Copy failed", { theme: "dark" });
        }
    };

    const showPassword = () => {
        if (ref.current.src.includes("icons/eyecross.png")) {
            ref.current.src = "icons/eye.png";
            passwordRef.current.type = "password";
        } else {
            passwordRef.current.type = "text";
            ref.current.src = "icons/eyecross.png";
        }
    };

    const savePassword = async () => {
        try {
            if (editId) {
                await updatePassword(editId, form)
                setTimeout(() => {
                    toast.success("Password updated!", { theme: "dark" });
                }, 50);
                setEditId(null);
            } else {
                await addPassword(form)
                setTimeout(() => {
                    toast.success("Password saved!", { theme: "dark" });
                }, 50);
            }
            const updated = await fetchPasswords()
            setPasswordArray(updated)
            setForm({ site: "", username: "", password: "" });
        } catch (err) {
            console.error(err)
            toast.error(err.response.data.message, { theme: 'dark' });
        }
    };

    const deletePassword = async (id) => {
        if (confirm("Do you really want to delete this password?")) {
            try {
                await removePassword(id)
                const updated = await fetchPasswords()
                setPasswordArray(updated)
                setTimeout(() => {
                    toast.success("Password deleted!", { theme: "dark" });
                }, 100);
            } catch (err) {
                console.log("password delete error", err)
                toast.error("failed to delete", { theme: "dark" })
            }
        }
    };

    const editPassword = (id) => {
        const passwordToEdit = passwordArray.find(i => i._id === id);
        setForm(passwordToEdit);
        setEditId(id);
    };

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const togglePasswordVisibility = (id) => {
        setVisiblePasswordIds((prev) => {
            return prev.includes(id)
                ? prev.filter((item) => item !== id)
                : [...prev, id];
        });
    };

    const handleExportPDF = () => {
        if (passwordArray.length === 0) {
            toast.error("No passwords to export.");
            return;
        }
        if (user?.role === "basic") {
            toast.error("Upgrade to premium to export passwords");
            return;
        }
        if (user?.role !== "premium") {
            toast.error("Upgrade to premium for export passwords.");
            return;
        }


        const doc = new jsPDF();
        doc.text("Password List", 14, 15);

        const tableData = passwordArray.map((item, index) => [
            index + 1,
            item.site,
            item.username,
            item.password,
        ]);

        autoTable(doc, {
            head: [["#", "Site", "Username", "Password"]],
            body: tableData,
            startY: 20,
        });

        doc.save("passwords.pdf");
        toast.success("PDF exported successfully!");
    };


    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={true}
                closeOnClick
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            />

            <div className="relative isolate bg-gray-900 px-6 py-24 sm:py-32 lg:px-8">
                <div aria-hidden="true" className="absolute inset-x-0 -top-3 -z-10 transform-gpu overflow-hidden px-36 blur-3xl">
                    <div style={{ clipPath: "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)" }} className="mx-auto aspect-1155/678 w-288.75 bg-linear-to-tr from-[#ff80b5] to-[#9089fc] opacity-20"></div>
                </div>
                <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto min-h-[84vh]">
                    <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-center">
                        <span className="text-indigo-500">&lt;</span>
                        <span className='text-white'>Pass</span>
                        <span className="text-indigo-500">OP/&gt;</span>
                    </h1>
                    <p className="text-slate-300 text-center text-base sm:text-lg">Your own Password Manager</p>


                    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 mt-6 items-center">
                        <input name="site" value={form.site} onChange={handleChange} placeholder="Enter website URL" type="text"
                            className="w-full max-w-xl rounded-full border border-slate-300 px-4 py-2 text-white" />

                        <div className="flex flex-col md:flex-row gap-4 w-full max-w-xl">
                            <input name="username" value={form.username} onChange={handleChange} placeholder="Enter Username" type="text"
                                className="flex-1 rounded-full border border-slate-300 px-4 py-2 text-white" />

                            <div className="relative flex-1">
                                <input ref={passwordRef} name="password" value={form.password} onChange={handleChange} placeholder="Enter Password" type="password"
                                    className="w-full rounded-full border border-slate-300 px-4 py-2 text-white" />
                                <span className="absolute right-2 top-1/2 transform -translate-y-1/2 cursor-pointer" onClick={showPassword}>
                                    <img ref={ref} src="icons/eye.png" alt="eye" className="w-6 h-6 invert" />
                                </span>
                            </div>
                        </div>

                        <button onClick={savePassword} className="flex items-center gap-2 bg-indigo-400 hover:bg-indigo-300 text-black px-6 py-2 rounded-full border border-indigo-900 cursor-pointer">
                            <lord-icon src="https://cdn.lordicon.com/jgnvfzqg.json" trigger="hover" style={{ width: "25px", height: "25px" }}></lord-icon>
                            {editId ? "Update" : "Save"}
                        </button>
                    </div>

                    <div className="mt-10 overflow-x-auto">
                        <div className='flex justify-between items-center mb-2'>
                            <h2 className="text-xl sm:text-2xl font-bold mb-4 text-white">Your Passwords</h2>
                            <button className="flex items-center gap-2 bg-indigo-400 hover:bg-indigo-300 text-black px-6 py-2 rounded-full border border-indigo-900 cursor-pointer" onClick={() => handleExportPDF()}>Export as PDF</button>
                        </div>
                        {passwordArray.length === 0 ? (
                            <p className='text-white'>No passwords to show</p>
                        ) : (
                            <table className="min-w-full table-auto text-sm sm:text-base">
                                <thead className="bg-indigo-800 text-white">
                                    <tr>
                                        <th className="px-2 py-2">Site</th>
                                        <th className="px-2 py-2">Username</th>
                                        <th className="px-2 py-2">Password</th>
                                        <th className="px-2 py-2">Actions</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-indigo-100">
                                    {passwordArray.map((item) => (
                                        <tr key={item._id} className="border-b border-white">
                                            <td className="px-2 py-2 text-center break-all">
                                                <div className="flex justify-center items-center gap-2">
                                                    <a href={item.site} target="_blank" rel="noopener noreferrer">{item.site}</a>
                                                    <div onClick={() => copyText(item.site)} className="cursor-pointer">
                                                        <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ width: "25px", height: "25px" }}></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-2 py-2 text-center break-all">
                                                <div className="flex justify-center items-center gap-2">
                                                    <span>{item.username}</span>
                                                    <div onClick={() => copyText(item.username)} className="cursor-pointer">
                                                        <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ width: "25px", height: "25px" }}></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-2 py-2 text-center">
                                                <div className="flex justify-center items-center gap-2 relative">
                                                    <span className="truncate w-[70px]">
                                                        {visiblePasswordIds.includes(item._id) ? item.password : "••••••••"}
                                                    </span>
                                                    <span onClick={() => togglePasswordVisibility(item._id)} className="cursor-pointer">
                                                        <img src={visiblePasswordIds.includes(item._id) ? "icons/eyecross.png" : "icons/eye.png"} alt="eye" className="w-6 h-6" />
                                                    </span>
                                                    <div onClick={() => copyText(item.password)} className="cursor-pointer">
                                                        <lord-icon src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover" style={{ width: "25px", height: "25px" }}></lord-icon>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="px-2 py-2 text-center">
                                                <div className="flex justify-center gap-2">
                                                    <span onClick={() => editPassword(item._id)} className="cursor-pointer">
                                                        <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{ width: "25px", height: "25px" }}></lord-icon>
                                                    </span>
                                                    <span onClick={() => deletePassword(item._id)} className="cursor-pointer">
                                                        <lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{ width: "25px", height: "25px" }}></lord-icon>
                                                    </span>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
};

export default Manager;
