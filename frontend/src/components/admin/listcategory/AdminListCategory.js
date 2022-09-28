import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPlus,
  faWrench,
  faTrashAlt,
} from "@fortawesome/free-solid-svg-icons";

import Loader from "../../loader/Loader";
import {
  getAllCategories,
  deleteCategory,
} from "../../../actions/categoryAction";

import { CATEGORY_DELETE_RESET } from "../../../constants/categoryConstants";

import AddCategory from "./addCategory/AddCategory";
import UpdateCategory from "./updateCategory/UpdateCategory";

import "./AdminListCategory.css";

const AdminListCategory = () => {
  const dispatch = useDispatch();

  const [isAdd, setIsAdd] = useState(false);
  const [isUpdate, setIsUpdate] = useState(false);
  const [id, setId] = useState();
  const [name, setName] = useState();
  const [image, setImage] = useState();
  const [type, setType] = useState();

  const allCategory = useSelector((state) => state.allCategory);
  const { listCategories, loading, success, error } = allCategory;

  const updateCategoryState = useSelector((state) => state.updateCategory);
  const { success: successUpdate } = updateCategoryState;

  const deleteCategoryState = useSelector((state) => state.deleteCategory);
  const {
    loading: loadingDelete,
    success: successDelete,
    error: errorDelete,
  } = deleteCategoryState;

  const createCategoryState = useSelector((state) => state.createCategory);
  const { success: successCreate } = createCategoryState;

  useEffect(() => {
    dispatch({ type: CATEGORY_DELETE_RESET });
  }, []);
  useEffect(() => {
    dispatch(getAllCategories());
  }, [successDelete, successCreate, successUpdate]);

  const handleAdd = (type) => {
    setIsAdd(!isAdd);
    setType(type);
  };

  const handleUpdate = (id, name, image, type) => {
    setId(id);
    setName(name);
    setImage(image);
    setType(type);
    setIsUpdate(!isUpdate);
  };

  const handleDelete = (id) => {
    dispatch(deleteCategory(id));
  };

  return (
    <div className="list-category-container">
      {isAdd && <AddCategory type={type} handleClose={handleAdd} />}
      {isUpdate && (
        <UpdateCategory
          handleClose={handleUpdate}
          AddCategory
          id={id}
          name={name}
          image={image}
          type={type}
        />
      )}
      <div className="flex-row">
        <h1 className="flex-1 m-l-32px">List Category</h1>
        <button
          className="m-r-32px btn-add"
          onClick={() => handleAdd("addCategory")}
        >
          Add category <FontAwesomeIcon icon={faPlus} />
        </button>
      </div>
      {successDelete && (
        <h4 className="t-a-center">
          <i className="color-red">
            <b> Xóa thành công {errorDelete}</b>
          </i>
        </h4>
      )}
      {errorDelete && (
        <h4 className="t-a-center">
          <i className="color-red">
            <b> Something went wrong! {errorDelete}</b>
          </i>
        </h4>
      )}
      {loadingDelete && (
        <div className="loader-center-screen">
          <Loader />
        </div>
      )}

      {listCategories === undefined || listCategories.size <= 0 ? (
        <h4 className="m-a">
          <i>Chưa có category</i>
        </h4>
      ) : (
        listCategories.map((category) => (
          <div className="wrap">
            <div
              className="flex-row align-item-center jt-ct-sb"
              key={category.id}
            >
              <div className="flex-column flex-2">
                <span className="">
                  <b>Category name: </b>
                  {category.name}
                </span>
                <img src={category.image} alt="category img" />
              </div>
              <div className="flex-1 flex-row jt-ct-sa">
                <button
                  className="btn-add"
                  onClick={() => handleAdd(category.name)}
                >
                  Add child <FontAwesomeIcon icon={faPlus} />
                </button>
                <button
                  className="btn-update"
                  onClick={() =>
                    handleUpdate(category.id, category.name, category.image)
                  }
                >
                  Update <FontAwesomeIcon icon={faWrench} />
                </button>
                <button
                  className="btn-delete"
                  onClick={() => handleDelete(category.id)}
                >
                  Delete <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </div>
            <span>
              <b>Children: </b>
            </span>
            {category.children === undefined || category.size <= 0 ? (
              <h4 className="m-a-lazy">
                <i>Chưa có category con của {category.name}</i>
              </h4>
            ) : (
              category.children.map((child) => (
                <div
                  className="flex-row m-l-32px align-item-center m-t-8px"
                  key={child.id}
                >
                  <div className="flex-column flex-2">
                    <span className="">
                      <b>Category name: </b>
                      {child.name}
                    </span>
                    <img src={child.image} alt="category img" />
                  </div>
                  <div className="flex-1 flex-row jt-ct-sa">
                    <button
                      className="btn-update"
                      onClick={() =>
                        handleUpdate(
                          child.id,
                          child.name,
                          child.image,
                          category.name
                        )
                      }
                    >
                      Update <FontAwesomeIcon icon={faWrench} />
                    </button>
                    <button
                      className="btn-delete"
                      onClick={() => handleDelete(child.id)}
                    >
                      Delete <FontAwesomeIcon icon={faTrashAlt} />
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default AdminListCategory;
