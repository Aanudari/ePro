import { useState } from "react";

function CreateExamForm() {
    const [selectV, setSelectV] = useState()
    return (
        <div className="container ">
            <form className="form-form p-2">

                <div className="group">
                    <input type="text" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Шалгалтын нэр</label>
                </div>

                <div className="group">
                    <input type="number" required />
                    <span className="highlight"></span>
                    <span className="bar"></span>
                    <label>Үргэлжлэх хугацаа</label>
                </div>
                <div className="p-4"></div>
                <div className="select-con">
                    <div class="select">
                        <select name="format" id="format">
                            <option selected disabled>Категори</option>
                            <option value="pdf">PDF</option>
                            <option value="txt">txt</option>
                            <option value="epub">ePub</option>
                            <option value="fb2">fb2</option>
                            <option value="mobi">mobi</option>
                        </select>
                    </div>
                </div>



            </form>
        </div>
    );
}

export default CreateExamForm;