import { useEffect, useState } from 'react';
import { Button, ButtonGroup, ButtonToolbar, Collapse, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

export default function Filters({ open, setOpen, Promotions, filteredPromotions, setPromotions, setSelected, selected }) {
  console.log('Promotions filtro', filteredPromotions);
  console.log('Promotions de l filtro', Promotions);
  const handleSortChange = e => {
    let sortedPromotions = [...filteredPromotions];
    switch (e.target.value) {
      case '1':
        console.log('A/A');
        sortedPromotions = filteredPromotions.sort((a, b) => {
          let A = a.title.toLowerCase();
          let B = b.title.toLowerCase();
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
        sortedPromotions = filteredPromotions.sort((a, b) => {
          let A = a.title.toLowerCase();
          let B = b.title.toLowerCase();
          if (A < B) {
            return 1;
          } else if (A > B) {
            console.log('name de A', A);
            console.log('name de B', A);
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        break;
      case '3':
        console.log('F/A');
        sortedPromotions = filteredPromotions.sort((a, b) => {
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
        sortedPromotions = filteredPromotions.sort((a, b) => {
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
        sortedPromotions = filteredPromotions.sort((a, b) => {
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
    console.log('SORTED ', sortedPromotions);
    setPromotions([...sortedPromotions]);
  };

  const handleSearchChange = e => {
    let value = e.target.value;
    let newPromotions;
    if (value === '') {
      setPromotions([...Promotions]);
      return;
    }
    newPromotions = Promotions.filter(promo => promo.title.toLowerCase().includes(value.toLowerCase()));
    console.log('filtered', newPromotions);
    setPromotions([...newPromotions]);
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
              <label className="form-label" for="form1">
                Busca una promoción
              </label>
              <div className="form-outline search__wrapper">
                <input onChange={handleSearchChange} type="search" id="form1" className="form-control" />
                <button type="button" className="btn btn-primary">
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
