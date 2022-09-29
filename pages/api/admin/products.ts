import type { NextApiRequest, NextApiResponse } from 'next';

import { isValidObjectId } from 'mongoose';
import { v2 as cloudinary } from 'cloudinary';

import { IProduct } from '../../../interfaces';
import { db } from '../../../database';
import { Product } from '../../../models';

cloudinary.config(process.env.CLOUDINARY_URL || '');

type Data =
  | {
      message: string;
    }
  | IProduct
  | IProduct[];

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  switch (req.method) {
    case 'GET':
      return getProducts(req, res);
    case 'PUT':
      return updateProducts(req, res);

    case 'POST':
      return createProducts(req, res);
    default:
      return res.status(400).json({ message: 'Bad request' });
  }
}

const getProducts = async (req: NextApiRequest, res: NextApiResponse<Data>) => {
  await db.connect();
  const products = await Product.find().sort({ title: 'asc' }).lean();
  await db.disconnect();
  const updatedProducts = products.map((product) => {
    product.images = product.images.map((image) => {
      return image.includes('http')
        ? image
        : `${process.env.HOST_NAME}products/${image}`;
    });
    return product;
  });
  return res.status(200).json(updatedProducts);
};

const updateProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { _id = '', images = [] } = req.body as IProduct;
  if (!isValidObjectId(_id)) {
    return res.status(400).json({ message: 'El id del producto no es valido' });
  }
  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: 'Es necesario al menos dos imagenes' });
  }
  try {
    await db.connect();

    const product = await Product.findById(_id);
    if (!product) {
      return res
        .status(400)
        .json({ message: 'No existe un producto con ese ID' });
    }

    product.images.forEach(async (image) => {
      if (!images.includes(image)) {
        const [fileId, extension] = image
          .substring(image.lastIndexOf('/') + 1)
          .split('.');
        await cloudinary.uploader.destroy(fileId);
      }
    });

    await product.update(req.body);
    await db.disconnect();
    return res.status(200).json(product);
  } catch (error) {
    console.log(error);

    await db.disconnect();
    return res.status(400).json({ message: 'Revisar la consola del servidor' });
  }
};

const createProducts = async (
  req: NextApiRequest,
  res: NextApiResponse<Data>
) => {
  const { images = [] } = req.body as IProduct;

  if (images.length < 2) {
    return res
      .status(400)
      .json({ message: 'Es necesario al menos dos imagenes' });
  }

  try {
    await db.connect();
    const productInDB = await Product.findOne({ slug: req.body.slug });
    if (productInDB) {
      return res
        .status(400)
        .json({ message: 'Ya existe un producto con un slug' });
    }
    const product = await new Product(req.body);
    await product.save();
    await db.disconnect();
    return res.status(201).json(product);
  } catch (error) {
    await db.disconnect();
    return res.status(400).json({ message: 'Revisar la consola del servidor' });
  }
};
