import React from 'react'
import {Button,Modal} from 'react-bootstrap'


export function Modale({accio,container}) {

  return (
        <Modal className="container__modal">
            <Modal.Header>
            <Modal.Title>Nuestra Ubicaciónn</Modal.Title>
            </Modal.Header>

            <Modal.Body>
            <div ref={container} className="map__container" />
            </Modal.Body>

            <Modal.Footer>
            <Button variant="secondary" onClick={()=>accio()}>Cerrar</Button>

            </Modal.Footer>
        </Modal>
  )
}
