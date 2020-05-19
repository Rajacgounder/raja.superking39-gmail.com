import React from 'react'
import PDFViewer from 'pdf-viewer-reactjs'

const ExamplePDFViewer = () => {
    return (
        <PDFViewer
            document={{
                url: 'https://firebasestorage.googleapis.com/v0/b/tool-5981d.appspot.com/o/document%2FAE_2019.pdf?alt=media&token=3880dc8a-a0e6-415a-bb8f-62ab9d3865fb',
            }}
        />
    )

}

export default ExamplePDFViewer;