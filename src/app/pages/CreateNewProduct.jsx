import { useState, useEffect, useCallback } from "react"
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button, Input, Loading } from '../components/commons';
import { conectorServices } from '../../services/api-conector';
import { validateItem, validateProduct } from '../../utils/util';

const serviceCategories = conectorServices('categories');
const serviceItem = conectorServices('products');

const CreateNewProduct = () => {
    let [queryParams] = useSearchParams();
    const id = queryParams.get('id');
    const [err, setErr] = useState({});
    const navegate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);
    const [origin, setOrigin] = useState({})
    const [item, setItem] = useState({
        categoryId: 1,
        categoryName: 'Sofás',
        stock: 0,
        price: 0,
    });

    const handleValue = (key, value) => {
        item[key] = value;
        setItem({
            ...item,
        });
    };
    const handleCategory = (id) => {
        const { name } = categories.find(i => i.id === id);
        item.categoryId = Number(id);
        item.categoryName = name;
    }
    const createProduct = async () => {
        const error = validateProduct(item);
        if (error) {
            setErr(error);
            return;
        }
        setLoading(true);
        try {
            if (id) {
                await serviceItem.update(id, validateItem(item, origin));
                navegate(`/detail/${id}`)
            } else {
                const { id } = await serviceItem.create(item);
                navegate(`/detail/${id}`)
            }
            //manejar el succes
        } catch (error) {
            console.error(err);
            // despues manejar el error
        } finally {
            setLoading(false)
        }
    }

    const promise = useCallback(async (id) => {
        setLoading(true);
        try {
            const promises = [serviceCategories.getAll()]
            if (id) {
                promises.push(serviceItem.getById(id))
            }
            const resolver = await Promise.all(promises);
            setCategories(resolver[0]);
            if (resolver[1]) {
                setItem(resolver[1]);
                setOrigin({ oldStock: resolver[1].stock, oldPrice: resolver[1].price });
            }
        } catch (err) {
            console.error(err);
            //manejar luego el error
        } finally {
            setLoading(false)
        }
    }, [setCategories, setItem, setOrigin, setLoading]);

    useEffect(() => {
        promise(id)
    }, [promise, id])

    return (
        <>
            {loading ? (<>
                <Loading loading={loading} />
            </>) : (<>
                <div style={{ marginTop: '50px' }}>
                    <div className="deco-mueble" style={{ margin: "0px auto" }}>
                        <h2 className="text-center">{id ? 'Actualizar producto' : 'Crear nuevo producto'}</h2>
                        <form style={{ marginTop: '50px', textAlign: "left" }}>
                            <div className="row">
                                <div className="col-4">
                                    <div className="mb-3">
                                        <label className="form-label">Categoria</label>
                                        <select defaultValue={item.categoryId} className="form-select"
                                            onChange={(e) => handleCategory(e.target.value)}
                                        >
                                            {categories?.map((i, index) => (
                                                <option key={index} value={i.id}>{i.name}</option>
                                            ))}
                                        </select>
                                    </div>
                                </div>
                                <div className="col-4">
                                    <Input
                                        title="Nombre"
                                        value={item.name}
                                        error={err.name}
                                        onChange={(e) => handleValue("name", e.target.value)}
                                    />
                                </div>
                                <div className="col-4">
                                    <Input
                                        title="Color"
                                        value={item.color}
                                        error={err.color}
                                        onChange={(e) => handleValue("color", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-3">
                                    <Input
                                        title="Precio"
                                        type="number"
                                        value={item.price}
                                        error={err.price}
                                        onChange={(e) => handleValue("price", Number(e.target.value))}
                                    />
                                </div>
                                <div className="col-3">
                                    <Input
                                        title="Stock"
                                        type="number"
                                        value={item.stock}
                                        error={err.stock}
                                        onChange={(e) => handleValue("stock", Number(e.target.value))}
                                    />
                                </div>
                                <div className="col-6">
                                    <Input
                                        title="Image URL"
                                        value={item.imageURL}
                                        error={err.imageURL}
                                        onChange={(e) => handleValue("imageURL", e.target.value)}
                                    />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-12">
                                    <Input
                                        title="Descripción"
                                        value={item.description}
                                        error={err.description}
                                        onChange={(e) => handleValue("description", e.target.value)}
                                    />
                                </div>
                            </div>
                        </form>
                        <Button className="text-center" variant="primary" textButton="Guardar" click={() => createProduct()} />
                    </div>
                </div>
            </>)}
        </>
    )
}

export default CreateNewProduct;