import { useCallback, useEffect, useState } from 'react';
import { conectorServices } from '../../services/api-conector'
import { useParams } from 'react-router-dom';;
import { Loading } from '../components/commons';
import Hero from '../layout/Hero';
import ListItems from '../components/custom/ListItems';

const serviceItems = conectorServices('products');

function ItemListContainer(props) {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const promise = useCallback(async (id) => {
    const promise = id ? serviceItems.find('categoryId', Number(id)) : serviceItems.getAll()
    setLoading(true);
    const items = await promise;
    setItems(items);
    setLoading(false);
  }, [setItems]);


  useEffect(() => {
    promise(id)
  }, [promise, id])

  return (
    <>
      {
        loading ? <Loading loading={loading} /> :
          <>
            <Hero />
            <div id='home'>
              <ListItems list={items}/>
            </div>
          </>
      }
    </>
  );
}

export default ItemListContainer;
