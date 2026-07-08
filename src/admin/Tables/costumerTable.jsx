import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../../components/nav";
import Profile from "../../pages/Profile";

export default function UserTable() {

    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);

    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;


    const getUsers = async () => {
        try {

            const res = await fetch("http://localhost:5000/api/users");

            const data = await res.json();

            setUsers(data);

        } catch (err) {
            console.log(err);
        }
    };


    useEffect(() => {
        getUsers();
    }, []);



    const filteredUsers = useMemo(() => {

        return users.filter((user) =>

            `${user.first_name} ${user.last_name} ${user.email}`
                .toLowerCase()
                .includes(searchTerm.toLowerCase())

        );

    }, [users, searchTerm]);



    const paginatedUsers = useMemo(() => {

        const start = (currentPage - 1) * itemsPerPage;

        return filteredUsers.slice(
            start,
            start + itemsPerPage
        );

    }, [filteredUsers, currentPage]);



    const totalPages = Math.ceil(
        filteredUsers.length / itemsPerPage
    );




    const handleDelete = async (id) => {

        try {

            const res = await fetch(
                `http://localhost:5000/api/users/${id}`,
                {
                    method: "DELETE"
                }
            );


            if (!res.ok) {
                throw new Error("Delete failed");
            }


            setUsers(
                users.filter(
                    user => user.user_id !== id
                )
            );


        } catch (err) {
            console.log(err);
        }

    };





    const handleUpdate = async (id, data) => {

        try {

            const res = await fetch(
                `http://localhost:5000/api/users/${id}`,
                {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json"
                    },
                    body: JSON.stringify(data)
                }
            );


            const updated = await res.json();


            if (!res.ok) {
                throw new Error(updated.error);
            }


            setUsers(
                users.map(user =>
                    user.user_id === id
                        ? updated
                        : user
                )
            );


            setEditingUser(null);


        } catch (err) {

            console.log(err);

        }

    };





    return (

        <>
            <NavBar />


            <div className="flex min-h-screen bg-[#FDFDFC] text-[#1A080B] font-sans">


                <Profile />


                <main className="flex-1 p-12">


                    <header className="mb-10 border-b border-[#1A080B]/10 pb-8">


                        <div className="flex justify-between items-center">


                            <h2 className="text-3xl font-serif">
                                Customer Management
                            </h2>



                            <input

                                placeholder="Search customers..."

                                className="px-4 py-2 border border-[#1A080B]/20 text-xs uppercase tracking-widest outline-none focus:border-[#D4AF37]"

                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1);
                                }}

                            />


                        </div>


                        <p className="text-l font-semibold tracking-wide mt-6">
                            Welcome , Elda Haxhidauti
                        </p>


                    </header>





                    {
                        editingUser ? (

                            <EditUserForm

                                user={editingUser}

                                onCancel={() => setEditingUser(null)}

                                onUpdate={handleUpdate}

                            />

                        )

                            :

                            (


                                <div className="border border-[#1A080B]/10 rounded-lg overflow-hidden">


                                    <table className="w-full text-left text-sm">


                                        <thead className="bg-[#F5F3EE] uppercase text-[14px] tracking-widest text-[#1A080B]/60">

                                            <tr>

                                                <th className="p-6 font-bold">
                                                    First Name
                                                </th>


                                                <th className="p-6 font-bold">
                                                    Last Name
                                                </th>


                                                <th className="p-6 font-bold">
                                                    Email
                                                </th>


                                                <th className="p-6 text-right">
                                                    Actions
                                                </th>


                                            </tr>

                                        </thead>




                                        <tbody className="divide-y divide-[#1A080B]/5">


                                            {
                                                paginatedUsers.map((user) => (


                                                    <tr
                                                        key={user.user_id}
                                                        className="hover:bg-[#FCFBF9]"
                                                    >


                                                        <td className="p-6  text-[17px]">
                                                            {user.first_name}
                                                        </td>


                                                        <td className="p-6 opacity-70">
                                                            {user.last_name}
                                                        </td>


                                                        <td className="p-6">
                                                            {user.email}
                                                        </td>

                                                        <td className="p-6 text-right space-x-6">
                                                            <button onClick={() => setEditingUser(user)} className="text-[#D4AF37] uppercase text-[10px] tracking-widest hover:underline">Edit</button>

                                                            <button onClick={() => handleDelete(user.user_id)} className="text-red-400 uppercase text-[10px] tracking-widest hover:underline">Delete</button>

                                                        </td>

                                                    </tr>
                                                ))
                                            }

                                        </tbody>

                                    </table>
                                </div>

                            )}


                    <div className="flex gap-2 mt-6">

                        {Array.from({ length: totalPages }, (_, i) => (
                            <button
                                key={i}
                                onClick={() => setCurrentPage(i + 1)}
                                className={`px-4 py-2 border text-[10px] uppercase ${currentPage === i + 1 ? "bg-[#1A080B] text-white" : "border-[#1A080B]/10"}`}>
                                {i + 1}
                            </button>
                        ))}

                    </div>
                </main>
            </div>
        </>

    );
}

function EditUserForm({ user, onCancel, onUpdate }) {


    const [data, setData] = useState({

        first_name: user.first_name,

        last_name: user.last_name,

        email: user.email

    });



    return (

        <div className="max-w-2xl bg-white p-10 border border-[#1A080B]/10">


            <div className="space-y-8">


                <input

                    className="w-full border-b border-[#1A080B]/20 py-3 outline-none"

                    value={data.first_name}

                    onChange={(e) =>
                        setData({
                            ...data,
                            first_name: e.target.value
                        })
                    }

                />



                <input

                    className="w-full border-b border-[#1A080B]/20 py-3 outline-none"

                    value={data.last_name}

                    onChange={(e) =>
                        setData({
                            ...data,
                            last_name: e.target.value
                        })
                    }

                />



                <input

                    className="w-full border-b border-[#1A080B]/20 py-3 outline-none"

                    value={data.email}

                    onChange={(e) =>
                        setData({
                            ...data,
                            email: e.target.value
                        })
                    }

                />



                <div className="flex gap-4">


                    <button

                        onClick={() =>
                            onUpdate(user.user_id, data)
                        }

                        className="flex-1 bg-[#1A080B] text-white py-4 uppercase text-xs tracking-widest"

                    >

                        Save Changes

                    </button>



                    <button

                        onClick={onCancel}

                        className="px-8 border uppercase text-xs tracking-widest"

                    >

                        Cancel

                    </button>


                </div>


            </div>


        </div>

    );

}