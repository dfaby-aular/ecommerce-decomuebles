import { useCallback, useEffect, useState } from 'react';
import  ShoppingDetail  from '../components/custom/ShoppingDetail';
import { Link, useParams} from 'react-router-dom';
import { conectorServices } from '../../services/api-conector'
import {Loading }from '../components/commons';


const shoppingServ = conectorServices('mappings');

const MyShopping = () => {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [items, setItems] = useState([]);

    const promise = useCallback(async (id) => {
        setLoading(true);
        const items = await shoppingServ.find('userId', id);
        setItems(items);
        setLoading(false);
    }, [setItems]);

    const reset = () => promise(id);

    useEffect(() => {
        promise(id)
    }, [promise, id])

    return (
        <>
            {
                loading ? <Loading loading={loading} /> :

                    <div id="" className="features" >
                        <div className="text-center items-container" style={{ marginTop: 50 }}>
                            <h1>Todas tus compras</h1>
                        </div>
                        {
                            items.length ?
                                <>
                                    <div className='mt-4 text-center container'>
                                        <Link to="/" className="btn btn-success"> Seguir Comprando</Link>
                                    <div className='row d-flex' style={{ marginTop: '50px' }}>
                                        <div className='col-md-12'>
                                            {items?.map(i => (
                                                <ShoppingDetail key={i.id} order={i} reset={reset} />
                                            ))}
                                        </div>
                                    </div>
                                    </div>
                                </>
                                : (
                                    <div className="col-sm-12 text-center feature" style={{ marginTop: 100 }}>
                                        <h4 style={{ color: "#898585" }}>No hay datos para mostrar</h4>
                                        <Link style={{ color: "#F81F55" }} to="/">Haga clic aquí para ir a Deco Muebles</Link>
                                    </div>
                                )
                        }
                    </div>

            }
        </>
    )
}

export default MyShopping;