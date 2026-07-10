import React, { useEffect, useMemo, useState } from "react";
import NavBar from "../../components/nav";
import Profile from "../../pages/Profile";

export default function ProductTable() {

    const [products, setProducts] = useState([]);
    const [view, setView] = useState("table");
    const [editingProduct, setEditingProduct] = useState(null);
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 10;


    const getProducts = async () => {
        try {
            const res = await fetch(
                "http://localhost:5000/api/products",
                {
                    credentials: "include"
                }
            );

            const data = await res.json();

            setProducts(data);

        } catch(err) {
            console.error(err);
        }
    };


    useEffect(() => {
        getProducts();
    }, []);



    const filteredProducts = useMemo(() => {

        return products.filter((p)=>

            `${p.product_name} ${p.sku} ${p.brand}`
            .toLowerCase()
            .includes(searchTerm.toLowerCase())

        );

    },[products,searchTerm]);



    const paginatedProducts = useMemo(()=>{

        const start = (currentPage - 1) * itemsPerPage;

        return filteredProducts.slice(
            start,
            start + itemsPerPage
        );

    },[filteredProducts,currentPage]);



    const handleDelete = async(id)=>{

        if(!window.confirm("Are you sure?"))
            return;


        try{

            const res = await fetch(
                `http://localhost:5000/api/products/${id}`,
                {
                    method:"DELETE",
                    credentials:"include"
                }
            );


            if(res.ok){
                getProducts();
            }


        }catch(err){
            console.error(err);
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
                                Product Inventory
                            </h2>



                            <div className="flex gap-4">


                                <input
                                    placeholder="Search..."
                                    className="px-4 py-2 border border-[#1A080B]/20 text-xs uppercase tracking-widest outline-none"
                                    onChange={(e)=>{
                                        setSearchTerm(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />



                                <button
                                    onClick={()=>{
                                        setEditingProduct(null);
                                        setView("add");
                                    }}
                                    className="bg-[#1A080B] text-white px-6 py-2 text-xs uppercase tracking-widest"
                                >
                                    + Add Product
                                </button>


                            </div>


                        </div>


                    </header>





                    {
                    view==="edit" || view==="add"

                    ?

                    <ProductForm

                        mode={view}

                        product={editingProduct}

                        onCancel={()=>{
                            setView("table");
                            setEditingProduct(null);
                        }}


                        onSuccess={()=>{
                            getProducts();
                            setView("table");
                            setEditingProduct(null);
                        }}

                    />


                    :


                    <div className="border border-[#1A080B]/10 rounded-lg overflow-hidden">


                        <table className="w-full text-left text-sm">


                            <thead className="bg-[#F5F3EE] uppercase text-[10px] tracking-widest text-[#1A080B]/60">

                                <tr>

                                    <th className="p-4">
                                        Name
                                    </th>

                                    <th className="p-4">
                                        Category
                                    </th>

                                    <th className="p-4">
                                        SKU
                                    </th>

                                    <th className="p-4">
                                        Brand
                                    </th>

                                    <th className="p-4">
                                        Metal
                                    </th>

                                    <th className="p-4">
                                        Weight (g)
                                    </th>

                                    <th className="p-4">
                                        Price
                                    </th>

                                    <th className="p-4 text-right">
                                        Actions
                                    </th>

                                </tr>

                            </thead>


                            <tbody className="divide-y divide-[#1A080B]/5">


                            {
                            paginatedProducts.map((p)=>(


                                <tr key={p.product_id}>


                                    <td className="p-4 text-xs font-medium">
                                        {p.product_name}
                                    </td>



                                    <td className="p-4 text-xs">

                                        {
                                        p.categories?.[0]?.category_name
                                        ||
                                        "No category"
                                        }

                                    </td>



                                    <td className="p-4 text-xs">
                                        {p.sku}
                                    </td>



                                    <td className="p-4 text-xs">
                                        {p.brand}
                                    </td>



                                    <td className="p-4 text-xs capitalize">
                                        {p.metal}
                                    </td>



                                    <td className="p-4 text-xs">
                                        {p.weight_grams}g
                                    </td>



                                    <td className="p-4 text-xs">
                                        ${p.price}
                                    </td>



                                    <td className="p-4 text-right space-x-4">


                                        <button

                                            onClick={()=>{
                                                setEditingProduct(p);
                                                setView("edit");
                                            }}

                                            className="text-[#D4AF37] uppercase text-[9px]"
                                        >
                                            Edit
                                        </button>



                                        <button

                                            onClick={()=>handleDelete(p.product_id)}

                                            className="text-red-400 uppercase text-[9px]"
                                        >
                                            Delete
                                        </button>


                                    </td>


                                </tr>


                            ))
                            }


                            </tbody>


                        </table>


                    </div>


                    }


                </main>


            </div>


        </>

    );
}

function ProductForm({ mode, product, onCancel, onSuccess }) {


    const [data, setData] = useState({

        supplier_id: "",
        category_id: "",
        product_name: "",
        sku: "",
        price: "",
        weight_grams: "",
        brand: "",
        metal: "",
        image: ""

    });



    const [suppliers, setSuppliers] = useState([]);
    const [categories, setCategories] = useState([]);
    const [imageFile, setImageFile] = useState(null);



    useEffect(()=>{


        if(product){


            setData({

                supplier_id: product.supplier_id || "",

                category_id:
                product.categories?.[0]?.category_id || "",

                product_name: product.product_name || "",

                sku: product.sku || "",

                price: product.price || "",

                weight_grams: product.weight_grams || "",

                brand: product.brand || "",

                metal: product.metal || "",

                image: product.image || ""

            });


        }


    },[product]);




    useEffect(()=>{


        const fetchData = async()=>{


            try{


                const [supRes,catRes] = await Promise.all([


                    fetch(
                        "http://localhost:5000/api/suppliers",
                        {
                            credentials:"include"
                        }
                    ),



                    fetch(
                        "http://localhost:5000/api/categories",
                        {
                            credentials:"include"
                        }
                    )


                ]);



                setSuppliers(await supRes.json());

                setCategories(await catRes.json());


            }catch(err){

                console.error(err);

            }


        };



        fetchData();


    },[]);






    const handleSubmit = async()=>{


        const formData = new FormData();



        Object.keys(data).forEach(key=>{


            formData.append(
                key,
                data[key]
            );


        });



        if(imageFile){

            formData.append(
                "image",
                imageFile
            );

        }




        const url =
        mode==="edit"

        ?

        `http://localhost:5000/api/products/${product.product_id}`

        :

        "http://localhost:5000/api/products";





        try{


            const res = await fetch(
                url,
                {

                    method:
                    mode==="edit"
                    ?
                    "PUT"
                    :
                    "POST",


                    body:formData,


                    credentials:"include"

                }
            );



            if(res.ok){


                const result = await res.json();

                onSuccess(result);


            }


        }catch(err){

            console.error(err);

        }


    };






    return (

        <div className="max-w-2xl bg-white p-10 border border-[#1A080B]/10 shadow-sm">


            <h3 className="text-xl font-serif mb-6">

                {
                mode==="edit"
                ?
                "Edit Product"
                :
                "Add New Product"
                }

            </h3>




            <div className="grid grid-cols-2 gap-6">





                <select

                    className="col-span-2 border-b py-2 outline-none"

                    value={data.supplier_id}

                    onChange={(e)=>

                        setData({

                            ...data,

                            supplier_id:e.target.value

                        })

                    }

                >

                    <option value="">
                        Select Supplier
                    </option>



                    {
                    suppliers.map(s=>(

                        <option

                            key={s.supplier_id}

                            value={s.supplier_id}

                        >

                            {
                            s.name ||
                            s.supplier_name
                            }

                        </option>

                    ))
                    }


                </select>






                <select

                    className="col-span-2 border-b py-2 outline-none"

                    value={data.category_id}

                    onChange={(e)=>

                        setData({

                            ...data,

                            category_id:e.target.value

                        })

                    }

                >

                    <option value="">
                        Select Category
                    </option>



                    {
                    categories.map(c=>(


                        <option

                            key={c.category_id}

                            value={c.category_id}

                        >

                            {c.category_name}

                        </option>


                    ))
                    }



                </select>






                <input

                    className="border-b py-2 outline-none"

                    value={data.product_name}

                    onChange={(e)=>

                        setData({

                            ...data,

                            product_name:e.target.value

                        })

                    }

                    placeholder="Product Name"

                />






                <input

                    className="border-b py-2 outline-none"

                    value={data.sku}

                    onChange={(e)=>

                        setData({

                            ...data,

                            sku:e.target.value

                        })

                    }

                    placeholder="SKU"

                />







                <input

                    className="border-b py-2 outline-none"

                    type="number"

                    value={data.price}

                    onChange={(e)=>

                        setData({

                            ...data,

                            price:e.target.value

                        })

                    }

                    placeholder="Price"

                />







                <input

                    className="border-b py-2 outline-none"

                    type="number"

                    value={data.weight_grams}

                    onChange={(e)=>

                        setData({

                            ...data,

                            weight_grams:e.target.value

                        })

                    }

                    placeholder="Weight (g)"

                />







                <input

                    className="border-b py-2 outline-none"

                    value={data.brand}

                    onChange={(e)=>

                        setData({

                            ...data,

                            brand:e.target.value

                        })

                    }

                    placeholder="Brand"

                />








                <select

                    className="border-b py-2 outline-none"

                    value={data.metal}

                    onChange={(e)=>

                        setData({

                            ...data,

                            metal:e.target.value

                        })

                    }

                >

                    <option value="">
                        Select Metal
                    </option>

                    <option value="gold">
                        Gold
                    </option>

                    <option value="silver">
                        Silver
                    </option>

                    <option value="steel">
                        Steel
                    </option>

                    <option value="platinum">
                        Platinum
                    </option>


                </select>






                <div className="col-span-2">


                    <label className="text-[10px] uppercase text-[#1A080B]/50">

                        Product Image

                    </label>



                    <input

                        className="w-full border-b py-2"

                        type="file"

                        onChange={(e)=>

                            setImageFile(
                                e.target.files[0]
                            )

                        }

                    />


                </div>



            </div>





            <div className="flex gap-4 pt-8">


                <button

                    onClick={handleSubmit}

                    className="flex-1 bg-[#1A080B] text-white py-3 uppercase text-xs tracking-widest"

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

    );


}