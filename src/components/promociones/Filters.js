import { useEffect, useState } from 'react';
import { Button, ButtonGroup, ButtonToolbar, Collapse, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

export default function Filters({ open, setOpen, promociones, filteredPromociones, setPromociones, setSelected, selected }) {
  console.log('promociones filtro', filteredPromociones);
  console.log('promociones de l filtro', promociones);
  const handleSortChange = e => {
    let sortedPromociones = [...filteredPromociones];
    switch (e.target.value) {
      case '1':
        console.log('A/A');
        sortedPromociones = filteredPromociones.sort((a, b) => {
          let A = a.titulo.toLowerCase();
          let B = b.titulo.toLowerCase();
          if (A > B) {
            return 1;
          } else if (A < B) {
            console.log('nomBre de A', A);
            console.log('nomBre de B', A);

            return -1;
          }
          // a must be equal to b
          return 0;
        });
        break;
      case '2':
        console.log('A/D');
        sortedPromociones = filteredPromociones.sort((a, b) => {
          let A = a.titulo.toLowerCase();
          let B = b.titulo.toLowerCase();
          if (A < B) {
            return 1;
          } else if (A > B) {
            console.log('nombre de A', A);
            console.log('nombre de B', A);
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        break;
      case '3':
        console.log('F/A');
        sortedPromociones = filteredPromociones.sort((a, b) => {
          if (a.fecha_expiracion > b.fecha_expiracion) {
            return 1;
          } else if (a.fecha_expiracion < b.fecha_expiracion) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        break;
      case '4':
        console.log('F/D');
        sortedPromociones = filteredPromociones.sort((a, b) => {
          if (a.fecha_expiracion < b.fecha_expiracion) {
            return 1;
          } else if (a.fecha_expiracion > b.fecha_expiracion) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        break;

      default:
        sortedPromociones = filteredPromociones.sort((a, b) => {
          if (a.evento_nombre > b.evento_nombre) {
            return 1;
          }
          if (a.evento_nombre < b.evento_nombre) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        break;
    }
    console.log('SORTED ', sortedPromociones);
    setPromociones([...sortedPromociones]);
  };

  const handleSearchChange = e => {
    let value = e.target.value;
    let newPromociones;
    if (value === '') {
      setPromociones([...promociones]);
      return;
    }
    newPromociones = promociones.filter(promo => promo.titulo.toLowerCase().includes(value.toLowerCase()));
    console.log('filtered', newPromociones);
    setPromociones([...newPromociones]);
  };

  return (
    <div className="filters__wrapper">
      <Button onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>
        Filtros
      </Button>
      <Collapse in={open}>
        <div id="example-collapse-text">
          <div className="filters">
            <div className="sortings">
              <Form.Select onChange={handleSortChange} aria-label="Default select example">
                <option>Open this select menu</option>
                <option value="1">Alfabetico/Ascendente</option>
                <option value="2">Alfabetico/Descendente</option>
                <option value="3">Fecha Caducidad/Ascendente</option>
                <option value="4">Fecha Caducidad/Descendente</option>
              </Form.Select>
            </div>
            <ButtonToolbar className="filter__selection" type="checkbox">
              <span>Escoge un filtro: </span>
              <ButtonGroup>
                <Button
                  onClick={e => {
                    setSelected(1);
                  }}
                  className={`${selected === 1 ? 'selected' : ''} button__option`}
                  value={1}
                >
                  Caducadas
                </Button>
                <Button
                  onClick={e => {
                    setSelected(2);
                  }}
                  className={`${selected === 2 ? 'selected' : ''} button__option`}
                  value={2}
                >
                  Vigentes
                </Button>
                <Button
                  onClick={e => {
                    setSelected(3);
                  }}
                  className={`${selected === 3 ? 'selected' : ''} button__option`}
                  value={3}
                >
                  Todos
                </Button>
              </ButtonGroup>
            </ButtonToolbar>
            <form className="input-group">
              <label class="form-label" for="form1">
                Busca una promoción
              </label>
              <div class="form-outline search__wrapper">
                <input onChange={handleSearchChange} type="search" id="form1" class="form-control" />
                <button type="button" class="btn btn-primary">
                  <FaSearch />
                </button>
              </div>
            </form>
          </div>
        </div>
      </Collapse>
    </div>
  );
}
