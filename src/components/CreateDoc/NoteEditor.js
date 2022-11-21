import React, {Component} from 'react'
import { CKEditor } from '@ckeditor/ckeditor5-react';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';


// firebase
// import { uploadBytes, getStorage, getDownloadURL, ref } from 'firebase/storage';


// class MyUploadAdapter {
//     constructor(loader) {
//         this.loader = loader;
//     }

    // Starts the upload process.
//     upload() {
//         return this.loader.file.then(
//             (file) =>
//                 new Promise((resolve, reject) => {
//                     // const { user } = useAuthContext()
//                     let storage = getStorage();
//                     let storageRef = ref(storage, `projectImg/${file.name}/${file.name}}`)
//                     uploadBytes(storageRef,file)
//                         .then((snapshot) => {
//                             return getDownloadURL(snapshot.ref);
//                         })
//                         .then((downloadURL) => {
//                             resolve({
//                                 default: downloadURL,
//                             });
//                         }).catch((error) => {
//                             reject(error.message);
//                         })
//                 })
//         );
//     }
// }

class NoteEditor extends Component{
    render(){
        const {setDetails, details} = this.props

        const custom_config = {
            // extraPlugins: [ MyCustomUploadAdapterPlugin ],
            toolbar: {
              items: [
                'heading',
                '|',
                'bold',
                'italic',
                'link',
                'bulletedList',
                'numberedList',
                '|',
                'blockQuote',
                'insertTable',
                '|',
                'undo',
                'redo'
              ]
            },
            table: {
              contentToolbar: [ 'tableColumn', 'tableRow', 'mergeTableCells' ]
            }
          }

        return (
            <div className="text-editor" >
                <CKEditor
                    editor={ClassicEditor}
                    config={custom_config}
                    type="text"
                    data={details}
                    onChange={(e, editor) => {
                        const data = editor.getData()
                        setDetails(data)
                    }}

                />
            </div >
        )
    }
  }

//   function MyCustomUploadAdapterPlugin(editor) {
//     editor.plugins.get( 'FileRepository' ).createUploadAdapter = (loader) => {
//       return new MyUploadAdapter(loader)
//     }
//   }

  export default NoteEditor;

