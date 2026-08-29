import { useState } from "react";
import { Modal, ModalBody } from "flowbite-react";
import Input from "../input/input";
import { userAuth } from "../context/auth";
import { addDoc, collection } from "firebase/firestore";
import { fetchFromFirestore, fireStore } from "../firebase/firebase";
import fileUpload from '../../assets/fileUpload.svg'
import loading from '../../assets/loading.gif'
import close from '../../assets/close.svg'

function Sell(props){
    const {toggleModalSell,status,setItems}=props
    const [title,setTitle]=useState('')
    const [category,setcategory]=useState('')
    const [price,setPrice]=useState('')
    const [description,setDescription]=useState('')
    const [submitting,setSubmitting]=useState(false)
    const [image,setImage]=useState(null)
    const [errors,setErrors]=useState({})

    const auth=userAuth()

    const handleClose=()=>{
        setImage(null)
        toggleModalSell()
    }

    const handleImageUpload=(e)=>{
        if(e.target.files)setImage(e.target.files[0])
    }

    const updateField=(field,setter)=>(value)=>{
        setter(value)
        setErrors((current)=>({...current,[field]:''}))
    }

    const handleSubmit = async (event)=>{
        event.preventDefault();

        if(!auth?.user){
            alert('Please login to continue');
            return;
        }

        const readImageAsDataUrl=(file)=>{
            return new Promise((resolve,reject)=>{
                const reader=new FileReader()
                reader.onloadend=()=>{
                    const imageUrl=reader.result
                    resolve(imageUrl)
                }
                reader.onerror=reject
                reader.readAsDataURL(file)
            })
        }

        const trimmedTitle = title.trim();
        const trimmedCategory = category.trim();
        const trimmedPrice = price.trim();
        const trimmedDescription = description.trim();

        const validationErrors = {}

        if(!trimmedTitle || !trimmedCategory || !trimmedPrice || !trimmedDescription || !image){
            if(!trimmedTitle) validationErrors.title = 'Title is required'
            if(!trimmedCategory) validationErrors.category = 'Category is required'
            if(!trimmedPrice) validationErrors.price = 'Price is required'
            if(!trimmedDescription) validationErrors.description = 'Description is required'
            if(!image) validationErrors.image = 'An image is required'
        }

        if(trimmedCategory && /\d/.test(trimmedCategory)){
            validationErrors.category = 'Category cannot contain numbers'
        }

        if(trimmedPrice && !/^\d+(\.\d+)?$/.test(trimmedPrice)){
            validationErrors.price = 'Price can only be a number'
        }

        const descriptionWordCount = trimmedDescription ? trimmedDescription.split(/\s+/).length : 0
        if(descriptionWordCount > 50){
            validationErrors.description = 'Description cannot exceed 50 words'
        }

        if(Object.keys(validationErrors).length){
            setErrors(validationErrors)
            return
        }

        setErrors({})
        setSubmitting(true)

        try {
            const imageUrl=await readImageAsDataUrl(image)

            await addDoc(collection(fireStore, 'products'), {
                title:trimmedTitle,
                category:trimmedCategory,
                price:trimmedPrice,
                description:trimmedDescription,
                imageUrl,
                userId: auth.user.uid,
                userName: auth.user.displayName || 'Anonymous',
                createdAt: new Date().toDateString(),
            });

            setImage(null);
            const datas = await fetchFromFirestore();
            setItems(datas)
            toggleModalSell();
            
        } catch (error) {
            console.log(error);
            alert('failed to add items to the firestore')
            
        }finally{
            setSubmitting(false)
        }

    }
    return (
        <Modal show={status} onClose={handleClose} position="center" size="lg" popup>
            <ModalBody className="max-h-[90vh] overflow-y-auto rounded-lg bg-white p-0">
                <div className="sticky top-0 z-20 flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
                    <div>
                        <h2 className="text-xl font-bold text-[#002f34]">Sell an item</h2>
                        <p className="mt-1 text-sm text-gray-500">Enter the product details below</p>
                    </div>
                    <button
                        type="button"
                        onClick={handleClose}
                        className="rounded-full p-2 hover:bg-gray-100"
                        aria-label="Close sell modal"
                    >
                        <img src={close} alt="" className="h-5 w-5" />
                    </button>
                </div>

                <div className="px-6 py-5 sm:px-8">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <Input setInput={updateField('title',setTitle)} placeholder='Title' error={errors.title}/>
                        <Input setInput={updateField('category',setcategory)} placeholder='Category' error={errors.category}/>
                        <Input setInput={updateField('price',setPrice)} placeholder='Price' inputMode='decimal' error={errors.price}/>
                        <Input setInput={updateField('description',setDescription)} placeholder='Description' error={errors.description}/>
                        <div className="relative pt-1">

                        {image?(
                            <div className="relative flex h-52 w-full justify-center overflow-hidden rounded-lg border-2 border-[#002f34] bg-gray-50">
                                <img src={URL.createObjectURL(image)} alt="Product preview" className="h-full w-full object-contain p-2"/>
                                <button
                                    type="button"
                                    onClick={() => setImage(null)}
                                    className="absolute right-3 top-3 rounded-full bg-white p-2 shadow hover:bg-gray-100"
                                    aria-label="Remove selected image"
                                >
                                    <img src={close} alt="" className="h-4 w-4" />
                                </button>
                            </div>
                        ):(
                            <label className="relative flex h-44 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-400 bg-gray-50 transition hover:border-[#002f34] hover:bg-teal-50">
                                <input onChange={handleImageUpload} type="file" accept="image/png,image/jpeg,image/svg+xml" className="absolute inset-0 h-full w-full cursor-pointer opacity-0" required/>
                                <div className="pointer-events-none flex flex-col items-center">
                                    <img src={fileUpload} alt="" className="h-11 w-11"/>
                                    <p className="pt-3 text-center text-sm font-semibold text-[#002f34]">Click to upload an image</p>
                                    <p className="pt-1 text-center text-xs text-gray-500">SVG, PNG or JPG</p>
                                </div>
                            </label>
                        )}
                        </div>
                        {errors.image && <p className="text-sm text-red-600">{errors.image}</p>}
                        
                        {submitting?
                        (
                            <div className="flex h-12 w-full items-center justify-center rounded-lg bg-[#002f34]">
                                <img src={loading} alt="Submitting" className="h-8 w-20 object-cover"/>
                            </div>
                        ):(
                            <button className="w-full rounded-lg bg-[#002f34] p-3 font-bold text-white transition hover:bg-[#00474f]">Sell Item</button>
                        )
                    }
                    </form>
                </div>
            </ModalBody>
        </Modal>
    )
}

export default Sell
