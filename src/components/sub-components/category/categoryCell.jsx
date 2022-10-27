import React, {useEffect, useState} from 'react';
import SubCategoryCell from "./subCategory/SubCategoryCell";

function CategoryCell(category) {
    return (
        <div>
            <div className="overflow-x-auto relative shadow-md sm:rounded-lg">
                <h5>Category нэр (maxpoint)</h5>
              <div>
                  {category && category.category.name} ({category && category.category.maxPoints})
                  <h5>Subcategory жагсаалт (maxpoint)</h5>
                  {
                      category ? category.category.subCategory.map((data, index) =>
                          <SubCategoryCell key={index} subcategory={data} />
                      ) : null
                  }
              </div>
            </div>
        </div>


    );
}

export default CategoryCell;
