import { useRouter } from 'next/router';
import React, { useState } from 'react'
import useSWR from 'swr'
import classes from './SaleForm.module.css'
import { BiArrowBack } from 'react-icons/bi'
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer, toast } from 'react-toastify';
import { v4 as uuidv4 } from 'uuid';


const fetcher = (...args) => fetch(...args).then(res => res.json())


const SaleForm = () => {

    const notify = () => toast.success("New Sale Added", {
        position: 'top-center', autoClose: 1000,
    });

    const router = useRouter()
    const [customerName, setCustomerName] = useState('')
    const [date, setDate] = useState('')
    const [amount, setAmount] = useState('')
    const [numberOfBags, setNumberOfBags] = useState('')

    const { year, cropId } = router.query


    const { data, error } = useSWR(`/api/crops/${cropId}`, fetcher, { refreshInterval: 1000 })


    const onSubmitForm = async (e) => {
        e.preventDefault()
        setCustomerName('')
        setDate('')
        setAmount('')
        setNumberOfBags('')

        const formdata = {
            saleId: uuidv4(),
            customerName,
            date,
            amount,
            numberOfBags
        }

        const postData = {
            cropName: data?.crop?.cropName,
            cropId: data?.crop?.cropId,
            startDate: data?.crop?.startDate,
            endDate: data?.crop?.endDate,
            numberofbags: data?.crop?.numberofbags,
            year: data?.crop?.year,
            createdAt: data?.crop?.createdAt,
            sales: [
                ...data.crop.sales,
                formdata
            ],
            expenditure: [
                ...data.crop.expenditure,
            ],
            miscellaneous: [
                ...data.crop.expenditure,
            ]
        }

        console.log(router.query.cropId);

        const response = await fetch(`/api/crops/${cropId}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
            },
            body: (JSON.stringify(postData))
        })
        if (response.ok) {
            notify();
        }


    }

    return (
        <div className={classes.AddSaleForm}>
            <div className={classes.arrowName}> <BiArrowBack className={classes.back} onClick={() => router.back()} /> <h2> {data && data.batchName}</h2> <h1></h1>
            </div>
            <h2>Add New Sale</h2>

            <form className={classes.SaleForm} onSubmit={onSubmitForm}>
                <input className={classes.SaleFormInput} type='text' placeholder='customer Name' value={customerName} onChange={(e) => { setCustomerName(e.target.value) }} />
                <input className={classes.SaleFormInput} type='date' value={date} onChange={(e) => { setDate(e.target.value) }} />
                <input className={classes.SaleFormInput} type='number' placeholder='Amount' value={amount} onChange={(e) => { setAmount(+e.target.value) }} />
                <input className={classes.SaleFormInput} type='number' placeholder='Number of Bags'
                    value={numberOfBags} onChange={(e) => { setNumberOfBags(+e.target.value) }} />

                <div className={classes.addSale}> <button type='submit' >Add Sale</button> </div>
                <ToastContainer />
            </form>
        </div>
    )
}

export default SaleForm