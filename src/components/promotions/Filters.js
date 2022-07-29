import { useEffect, useState } from 'react';
import { Button, ButtonGroup, ButtonToolbar, Collapse, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

export default function Filters({ open, setOpen, promotions, filteredPromotions, setPromotions, setSelected, selected }) {
  const handleSortChange = e => {
    let sortedPromotions = [...filteredPromotions];
    switch (e.target.value) {
      case '1':
        sortedPromotions = filteredPromotions.sort((a, b) => {
          let A = a.name.toLowerCase();
          let B = b.name.toLowerCase();
          if (A > B) {
            return 1;
          } else if (A < B) {

            return -1;
          }
          // a must be equal to b
          return 0;
        });
        break;
      case '2':
        sortedPromotions = filteredPromotions.sort((a, b) => {
          let A = a.name.toLowerCase();
          let B = b.name.toLowerCase();
          if (A < B) {
            return 1;
          } else if (A > B) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        break;
      case '3':
        sortedPromotions = filteredPromotions.sort((a, b) => {
          if (a.final_date > b.final_date) {
            return 1;
          } else if (a.final_date < b.final_date) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        break;
      case '4':
        sortedPromotions = filteredPromotions.sort((a, b) => {
          if (a.final_date < b.final_date) {
            return 1;
          } else if (a.final_date > b.final_date) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        break;

      default:
        sortedPromotions = filteredPromotions.sort((a, b) => {
          if (a.event_name > b.event_name) {
            return 1;
          }
          if (a.event_name < b.event_name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        break;
    }
    setPromotions([...sortedPromotions]);
  };

  const handleSearchChange = e => {
    let value = e.target.value;
    let newPromotions;
    if (value === '') {
      setPromotions([...promotions]);
      return;
    }
    newPromotions = promotions.filter(promo => promo.name.toLowerCase().includes(value.toLowerCase()));
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
                  Usadas
                </Button>
                <Button
                  onClick={e => {
                    setSelected(4);
                  }}
                  className={`${selected === 3 ? 'selected' : ''} button__option`}
                  value={4}
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
