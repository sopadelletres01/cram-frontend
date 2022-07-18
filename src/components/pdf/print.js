import React, { useRef } from "react";
import { jsPDF } from "jspdf";


export const pdfGeneratePromo = ({url}) => {
    let doc = new jsPDF('landscape','px','a4','false')
    doc.addImage(url,'PNG')
    doc.addPage()
    doc.setFont('Helvetica','bold')
    doc.text(60,60,'Name')
    doc.text(60,60,'Email')
    doc.setFont()
    doc.save('a.pdf')
}

