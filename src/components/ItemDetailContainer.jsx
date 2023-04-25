import { useCallback, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { products } from '../utils/list.util'
import LoadingLottie from './commons/loading/LoadingLottie';

export const ItemDetailContainer = () => {

    const { id } = useParams();
    const [item, setItem] = useState({});
    const [loading, setLoading] = useState(false);

    const promise = useCallback(async (id) => {
        setLoading(true);
        setTimeout(() => {
            const data= products.find(i=> i.id === Number(id))
            setItem(data);
            setLoading(false)
        }, 3000);
    }, [setItem]);

    useEffect(() => {
        promise(id)
    }, [promise, id])

    return (
        <>
            {
                loading ? <LoadingLottie loading={loading} /> :
                    <div className="estimateNew">
                        <section id="item" className="features features-2" >
                            <div className="container">
                                <div className="features features-10">
                                    <div className="container">
                                        <div className='text-center'>
                                            <h1>Detalle del producto</h1>
                                        </div>
                                        <div className="row v-align-children" style={{ marginTop: '50px' }}>
                                            <div className="col-md-6">
                                                <div>
                                                    <div className="hover" style={{ backgroundImage: `url(${item?.imageURL})`, paddingTop: "55%", backgroundPosition: "top center", backgroundSize: "100%", maxHeight: "100%", height:"500px", backgroundRepeat:"no-repeat" }}>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-md-5 col-md-offset-1">
                                                <ul className="bulletPoints">
                                                    <li><strong>Precio: </strong>{item?.price}</li>
                                                    <li><strong>Color: </strong>{item?.color}</li>
                                                    <li><strong>Stock: </strong> {item?.stock} Unidades</li>
                                                </ul>
                                                <div style={{ marginLeft: "24px" }}>
                                                    Descripción: {item?.description}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </section>
                    </div>
            }
        </>
    )
}

export default ItemDetailContainer;