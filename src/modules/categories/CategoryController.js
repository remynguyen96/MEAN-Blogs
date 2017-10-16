import Category from "./Category";

export async function listCategory(req, res) {
  const skip = parseInt(req.query.skip, 0);
  const limit = parseInt(req.query.limit, 0);
  try {
    const categories = await Category.listCategories({ skip, limit });
    return res.status(200).json(categories);
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function detailCategory(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    return res.status(200).json(category);
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function addCategory(req, res) {
  try {
    const category = await Category.create(req.body);
    return res.status(201).json(category);
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function editCategory(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    Object.keys(req.body).forEach(key => {
      category[key] = req.body[key];
    });
    return res.status(200).json(await category.save());
  } catch (e) {
    return res.status(400).json(e);
  }
}

export async function removeCategory(req, res) {
  try {
    const category = await Category.findById(req.params.id);
    await category.remove();
    return res.status(200).json("success");
  } catch (e) {
    return res.status(400).json(e);
  }
}
