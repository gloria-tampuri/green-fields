import React,{useContext} from 'react'
import Modal from '../Modal/Modal'
import classes from './Delete.module.css'
import {AiOutlineClose} from 'react-icons/ai'
import { DeleteContext } from '../../Context/DeleteContext'
import { useRouter } from 'next/router'

const Delete = ({selectedId,routeUrl,type,typeId}) => {
 
  const router = useRouter()
  // Get the id of the crop
 const {cropId} = router.query
 const {equipmentId} = router.query

    const deleteCtx=useContext(DeleteContext)
    const{ hideDeleteModal}=deleteCtx
    const deleteSaleHandler = async () =>{
      // Perform our delete logic here
      console.log("Start API");
      //  await fetch(`/api/crops/${cropId}/${routeUrl}/${selectedId}`,{
      //     method: 'PATCH'
      //    })
      await fetch(`/api/${type}/${typeId}/${routeUrl}/${selectedId}`,{
        method: 'PATCH'
        
       })
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