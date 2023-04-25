import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import LoadingLottie from './commons/loading/LoadingLottie';
import { products } from '../utils/list.util'
import Item from './Item';

function ItemListContainer(props) {
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  const [items, setItems] = useState([]);

  const promise = useCallback(async (id) => {
    setLoading(true);
    setTimeout(() => {
      let items = products;
      if (id) {
        items = products.filter(i => i.categoryId === Number(id))
      }
      setItems(items);
      setLoading(false)
    }, 3000);
  }, [setItems]);


  useEffect(() => {
    promise(id)
  }, [promise, id])

  return (
    <>
      {
        loading ? <LoadingLottie loading={loading} /> :
          <div id='home' className="deco-mueble">
            <section id="items" className="features features-2" >
              <div className="container">
                <div className="row" style={{ marginTop: "0px" }}>
                  <div className="col-md-1 col-md-offset-1 col-sm-12"></div>
                  <div className="col-md-10 col-md-offset-1 col-sm-12 text-center">
                    <h3>Encuentra tu mueble ideal</h3>
                  </div>
                </div>
                <div className="row">
                  {
                    items.length ?
                      items?.map((i, index) => (
                        <Item key={index} item={i} />
                      )) : (
                        <div className="col-sm-12 text-center feature ">
                          <h4 style={{ color: "#898585" }}>No hay datos para mostrar</h4>
                        </div>
                      )
                  }
                </div>
              </div>
            </section>
          </div>
      }

    </>
  );
}

export default ItemListContainer;
