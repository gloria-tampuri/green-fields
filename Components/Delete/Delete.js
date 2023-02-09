import React,{useContext} from 'react'
import Modal from '../Modal/Modal'
import classes from './Delete.module.css'
import {AiOutlineClose} from 'react-icons/ai'
import { DeleteContext } from '../../Context/DeleteContext'
import { useRouter } from 'next/router'

const Delete = ({selectedSaleId}) => {
  const router = useRouter()
  // Get the id of the crop
 const {cropId} = router.query

    const deleteCtx=useContext(DeleteContext)
    const{ hideDeleteModal}=deleteCtx
    const deleteSaleHandler = async () =>{
      // Perform our delete logic here
      console.log("Start API");
      // selectedSaleId && await fetch(`/api/crops/${cropId}/sale/${selectedSaleId}`,{
      //     method: 'DELETE',
      //     headers:{
      //       "Content-Type":"application/json"
      //     },
      //    })
       hideDeleteModal()
    }
  return (
    <Modal>
        <div className={classes.close}><AiOutlineClose onClick={hideDeleteModal} className={classes.closeIcon}/></div>
   <p className={classes.header}> Are you sure you want to delete entery     ?</p>

    <div className={classes.actions}>
        <div className={classes.actions1} onClick={deleteSaleHandler}>Delete</div>
        <div className={classes.actions2} onClick={hideDeleteModal}>Cancel</div>
    </div>

    </Modal>
  )
}

export default Delete