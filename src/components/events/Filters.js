import { useEffect, useState } from 'react';
import { Button, ButtonGroup, ButtonToolbar, Collapse, Dropdown, DropdownButton, Form, InputGroup } from 'react-bootstrap';
import { FaSearch } from 'react-icons/fa';

export default function Filters({ open, setOpen, events, filteredEventos, setEventos, setSelected, selected }) {
  const handleSortChange = e => {
    let sortedEventos = [...filteredEventos];
    switch (e.target.value) {
      case '1':
        sortedEventos = filteredEventos.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        break;
      case '2':
        sortedEventos = filteredEventos.sort((a, b) => {
          if (a.name < b.name) {
            return 1;
          }
          if (a.name > b.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        break;
      case '3':
        sortedEventos = filteredEventos.sort((a, b) => {
          if (a.fecha_inicio > b.fecha_inicio) {
            return 1;
          }
          if (a.fecha_inicio < b.fecha_inicio) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        break;
      case '4':
        sortedEventos = filteredEventos.sort((a, b) => {
          if (a.fecha_inicio < b.fecha_inicio) {
            return 1;
          }
          if (a.fecha_inicio > b.fecha_inicio) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        break;

      default:
        sortedEventos = filteredEventos.sort((a, b) => {
          if (a.name > b.name) {
            return 1;
          }
          if (a.name < b.name) {
            return -1;
          }
          // a must be equal to b
          return 0;
        });
        break;
    }
    setEventos([...sortedEventos]);
  };

  const handleSearchChange = e => {
    let value = e.target.value;
    let newEventos;
    if (value === '') {
      setEventos([...events]);
      return;
    }
    newEventos = events.filter(ev => ev.name.toLowerCase().includes(value.toLowerCase()));
    setEventos([...newEventos]);
  };

  return (
    <div className="filters__wrapper">
      <Button className='button_search' onClick={() => setOpen(!open)} aria-controls="example-collapse-text" aria-expanded={open}>
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
                <option value="3">Fecha/Ascendente</option>
                <option value="4">Fecha/Descendente</option>
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
                  Inscritos
                </Button>
                <Button
                  onClick={e => {
                    setSelected(2);
                  }}
                  className={`${selected === 2 ? 'selected' : ''} button__option`}
                  value={2}
                >
                  No inscritos
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
              <label className="form-label" htmlFor="form1">
                Busca un evento:
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
