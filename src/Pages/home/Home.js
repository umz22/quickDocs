import AddBtn from '../../components/AddBtn/AddBtn'
import QuickDocs from '../../components/QuickDocs/QuickDocs';
import Modal from '../../components/Modal/Modal';
import CreateDoc from '../../components/CreateDoc/CreateDoc';
import { Sidebar } from '../../components/Sidebar/Sidebar';
import { useState } from 'react';

// hooks
import { useAuthContext } from '../../hooks/useAuthContext';
import { useCollection } from '../../hooks/useCollection';

// styles
import styles from './Home.module.css'


export default function Home() {
  const { user } = useAuthContext()
  const { 
    documents, 
    filterBtn, 
    error, 
    docsPlaceHolder, 
    sidebarPlaceholder, 
    sideBarData } = useCollection('documents', ["uid", "==", user.uid], ["createdAt", "desc"])
  const [showModal, setShowModal] = useState(false)
  const [filterSearch, setFilterSearch] = useState('')


  const clickHandle = () => {
    setShowModal(true)
  }

    const filterHandle = (e) => {
      setFilterSearch(e)
      console.log(filterSearch)
    }

    const handleClose = () => {
      setShowModal(false)
    }


    return <div className={styles[`home-page`]}>
      {/* Add Button */}
      <AddBtn clickHandle={clickHandle}></AddBtn>

      {/* Add Doc Modal */}
      {showModal && <Modal handleClose={handleClose}>
        <CreateDoc
          handleClose={handleClose}
          uid={user.uid}
        />
      </Modal>}

      {/* Sidebar */}
      <Sidebar
        filterHandle={filterHandle}
        filterBtn={filterBtn}
        sidebarPlaceholder={sidebarPlaceholder}
        sideBarData={sideBarData}
      >
      </Sidebar>

      {/* Documents */}
      {error && <p>{error}</p>}
      {documents && 
        <QuickDocs
          filterSearch={filterSearch}
          documents={documents}
          docsPlaceHolder={docsPlaceHolder}
        />}

    </div>;
  }
