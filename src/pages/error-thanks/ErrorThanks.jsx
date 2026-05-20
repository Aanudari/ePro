import React, { useEffect, useState } from "react";
import Navigation from "../../components/Navigation";
import { useStateContext } from "../../contexts/ContextProvider";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Modal } from "react-bootstrap";
import Select from "react-select";
import { notification } from "../../service/toast";
import { ToastContainer } from "react-toastify";
import { logout } from "../../service/examService";
import getWindowDimensions from "../../components/SizeDetector";
import Dropdown from "react-bootstrap/Dropdown";
import * as XLSX from "xlsx";
import moment from "moment";

const API_URL = process.env.REACT_APP_URL;

const UNAUTHORIZED_MESSAGES = [
  "Unauthorized",
  "Input string was not in a correct format.",
];

const modalWidthStyle = (width) =>
  width < 768
    ? {
        width: "calc(100%)",
        left: "0",
      }
    : {
        width: "calc(100% - 250px)",
        left: "250px",
      };

const getSeason = (dateValue) => {
  const month = new Date(dateValue).getMonth() + 1;

  if (month >= 1 && month <= 3) return "1-р улирал";
  if (month >= 4 && month <= 6) return "2-р улирал";
  if (month >= 7 && month <= 9) return "3-р улирал";
  if (month >= 10 && month <= 12) return "4-р улирал";

  return "";
};

const getDateLabel = (dateValue) =>
  new Date(dateValue).toLocaleString("en-US", {
    month: "short",
    day: "numeric",
  });

const renderPendingText = (value) =>
  value === "" ? (
    <span className="inline-flex items-center rounded-full bg-yellow-50 px-2 py-0.5 text-xs font-medium text-yellow-700 ring-1 ring-inset ring-yellow-200">
      pending
    </span>
  ) : (
    value
  );

const PageButton = ({ children, className = "", ...props }) => (
  <button
    {...props}
    className={`inline-flex items-center justify-center gap-2 rounded-lg px-3 py-2 text-sm font-medium shadow-sm transition-all duration-200 focus:outline-none focus:ring-4 disabled:cursor-not-allowed disabled:opacity-60 ${className}`}
  >
    {children}
  </button>
);

const TableCheckBox = ({ checked, onChange }) => (
  <input
    type="checkbox"
    onChange={onChange}
    checked={checked}
    className="w-4 h-4 text-indigo-600 bg-gray-100 border-gray-300 rounded focus:ring-2 focus:ring-indigo-500"
  />
);

const CountBadge = ({ children, active = true }) => (
  <span
    className={`ml-2 inline-flex min-w-[24px] items-center justify-center rounded-full px-2 py-0.5 text-xs font-medium ${
      active ? "bg-indigo-600 text-white" : "bg-gray-100 text-gray-600"
    }`}
  >
    {children}
  </span>
);

const FilterDropdown = ({ title, variant, children }) => (
  <Dropdown alignstart="true" className="d-inline" autoClose="outside">
    <Dropdown.Toggle
      variant={variant}
      className="px-3 py-2 text-sm font-medium rounded-lg shadow-sm"
      size="sm"
    >
      {title}
    </Dropdown.Toggle>
    <Dropdown.Menu className="p-2 mt-2 border-0 shadow-xl rounded-xl">
      {children}
    </Dropdown.Menu>
  </Dropdown>
);

const FilterItem = ({ children, onClick, value }) => (
  <Dropdown.Item
    onClick={onClick}
    value={value}
    className="px-3 py-2 rounded-lg"
  >
    <p className="items-center block mb-0 text-sm font-medium text-gray-600 rounded-lg hover:text-indigo-600">
      {children}
    </p>
  </Dropdown.Item>
);

function ErrorThanks() {
  const { width } = getWindowDimensions();
  const { TOKEN } = useStateContext();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(10);
  const [complainInfo, setComplainInfo] = useState([]);
  const [complain, setComplain] = useState([]);
  const [filteredData, setFilteredData] = useState([]);

  const [selectedOption, setSelectedOption] = useState(null);
  const [showCreate, setShowCreate] = useState(null);
  const [showDelete, setShowDelete] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [trigger, setTrigger] = useState(false);

  const [activeTab, setActiveTab] = useState("1");
  const [selectedIds, setSelectedIds] = useState([]);

  const [selectedYear, setSelectedYear] = useState("");
  const [selectedSeason, setSelectedSeason] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");

  const showModalCreate = () => setShowCreate(true);
  const hideModalCreate = () => setShowCreate(null);
  const showModalDelete = () => setShowDelete(true);
  const hideModalDelete = () => setShowDelete(null);

  const handleUnauthorized = (message) => {
    if (UNAUTHORIZED_MESSAGES.includes(message)) logout();
  };

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${API_URL}/v1/Complain/complainInfo`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          setComplainInfo(res.data.complainInfos);
        }

        handleUnauthorized(res.data.resultMessage);
      })
      .catch((err) => console.log(err));
  }, [trigger]);

  useEffect(() => {
    axios({
      method: "get",
      headers: {
        Authorization: `${TOKEN}`,
      },
      url: `${API_URL}/v1/Complain`,
    })
      .then((res) => {
        if (res.data.isSuccess === true) {
          setComplain(res.data.complains);
        }

        handleUnauthorized(res.data.resultMessage);
      })
      .catch((err) => console.log(err));
  }, [trigger]);

  useEffect(() => {
    localStorage.setItem("activeTab", activeTab);
  }, [activeTab]);

  const years = complain.map((item) => new Date(item.createdAt).getFullYear());
  const uniqueYears = [...new Set(years)];

  const seasons = complain.map((item) => getSeason(item.createdAt));
  const uniqueSeasons = [...new Set(seasons)];

  const divisionNames = complain.map((item) => item.divisionName);
  const uniqueDivisionNames = [...new Set(divisionNames)];

  const handleCreate = () => {
    if (selectedOption === null) {
      notification.error(`Сонголт хоосон байна!`);
      return;
    }

    navigate("/create-error-thanks", {
      state: { type: selectedOption },
    });
  };

  const handleEdit = (tab) => {
    navigate("/edit-error-thanks", {
      state: { data: tab },
    });
  };

  useEffect(() => {
    let data = [...complain];

    if (activeTab) {
      data = data.filter((item) => `${item.complain}` === `${activeTab}`);
    }

    if (selectedYear) {
      data = data.filter(
        (item) =>
          Number(selectedYear) === new Date(item.createdAt).getFullYear(),
      );
    }

    if (selectedSeason) {
      data = data.filter(
        (item) => selectedSeason === getSeason(item.createdAt),
      );
    }

    if (selectedDivision) {
      data = data.filter((item) => item.divisionName === selectedDivision);
    }

    if (searchQuery) {
      data = data.filter((item) =>
        item.firstName?.toLowerCase().includes(searchQuery.toLowerCase()),
      );
    }

    setFilteredData(data);
  }, [
    complain,
    activeTab,
    selectedYear,
    selectedSeason,
    selectedDivision,
    searchQuery,
  ]);

  useEffect(() => {
    setCurrentPage(1);
  }, [activeTab, selectedYear, selectedSeason, selectedDivision, searchQuery]);

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleYearChange = (year = "") => {
    setSelectedYear(year);
  };

  const handleSeasonChange = (season = "") => {
    setSelectedSeason(season);
  };

  const handleDivisionChange = (division = "") => {
    setSelectedDivision(division);
  };

  const handleCheckboxChange = (itemId) => {
    if (selectedIds.includes(itemId)) {
      setSelectedIds(selectedIds.filter((id) => id !== itemId));
      return;
    }

    setSelectedIds([...selectedIds, itemId]);
  };

  const deleteSelectedItems = () => {
    for (const id of selectedIds) {
      axios({
        method: "delete",
        headers: {
          Authorization: `${TOKEN}`,
          accept: "text/plain",
        },
        url: `${API_URL}/v1/Complain/delete?id=${id}`,
      })
        .then((res) => {
          if (res.data.isSuccess === true) {
            notification.success(`${res.data.resultMessage}`);
            setTrigger((prev) => !prev);
            setSelectedIds([]);
            hideModalDelete();
          } else {
            console.log(res.data.resultMessage);
          }

          handleUnauthorized(res.data.resultMessage);
        })
        .catch((err) => console.log(err));
    }
  };

  const handleSelectAll = (event) => {
    const isChecked = event.target.checked;
    setSelectedIds(isChecked ? filteredData.map((item) => item.id) : []);
  };

  function sheet_set_range_style(sheet, range, style) {
    const rangeObj = XLSX.utils.decode_range(range);

    for (let r = rangeObj.s.r; r <= rangeObj.e.r; r++) {
      for (let c = rangeObj.s.c; c <= rangeObj.e.c; c++) {
        const cell = sheet[XLSX.utils.encode_cell({ r, c })] || {};
        cell.s = cell.s || {};
        Object.assign(cell.s, style);
      }
    }
  }

  const handleDownloadClick = () => {
    const table = document.getElementById("table");
    const worksheet = XLSX.utils.table_to_sheet(table);

    sheet_set_range_style(worksheet, "A1:A999", { hidden: true });

    XLSX.utils.sheet_add_aoa(worksheet, [[""]], {
      origin: -1,
      startCol: 0,
      endCol: 1,
    });

    XLSX.utils.sheet_add_aoa(
      worksheet,
      [
        ["#"],
        ...Array.from(table.rows)
          .slice(1)
          .map((row, index) => [index + 1]),
      ],
      { origin: 0, startCol: 0, endCol: 1 },
    );

    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");

    const fileBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const today = new Date();
    const format = "YYYYMMdivHHmmss";
    const fileName =
      `${complainInfo.find((item) => `${item.id}` === `${activeTab}`)?.category || "report"}` +
      `${moment(today).format(format)}` +
      `.xlsx`;

    const blob = new Blob([fileBuffer], { type: "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");

    link.href = url;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const niitAldaa = filteredData?.filter((item) => {
    if (`${item.complain}` === `${activeTab}`) return item;
    return null;
  });

  const too = niitAldaa
    .map((item) => parseInt(item.too))
    .reduce((acc, val) => acc + val, 0);

  const isAllSelected =
    filteredData.length > 0 && selectedIds.length === filteredData.length;

  const activeCategory = complainInfo.find(
    (item) => `${item.id}` === `${activeTab}`,
  );

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = filteredData.slice(
    indexOfFirstRecord,
    indexOfLastRecord,
  );

  const commonHeaderColumns = [
    "Он",
    "Улирал",
    "Огноо",
    "Харьяалагдах хэлтэс",
    "Ажлын байр",
    "Ажилтны нэр",
  ];

  const renderHeaderCell = (label, index) => (
    <th
      key={`${label}-${index}`}
      className="px-3 py-2 font-semibold whitespace-nowrap"
    >
      {label}
    </th>
  );

  const renderCountHeaderCell = (label) => (
    <th className="px-3 py-2 font-semibold whitespace-nowrap">
      {label}
      <CountBadge>{too}</CountBadge>
    </th>
  );

  const renderTableHead = () => {
    let extraColumns = [];

    if (activeTab === "1") {
      extraColumns = [
        "Гомдлын төрөл",
        "Холбогдох дугаар",
        "Гомдлын дэлгэрэнгүй",
        "Шийдвэрлэсэн эсэх",
        "Шийдвэрлэсэн хариу",
      ];
    } else if (activeTab === "2") {
      extraColumns = [
        "Гомдлын төрөл",
        "Холбогдох дугаар",
        "Гомдлын дэлгэрэнгүй",
        "Шийдвэрлэсэн эсэх",
      ];
    } else {
      extraColumns = ["Төрөл", "Дэлгэрэнгүй", "Бүртгэгдсэн суваг"];
    }

    return (
      <tr className="text-xs tracking-wide text-left text-gray-500 uppercase border-b border-gray-200 bg-gray-50">
        <th className="px-3 py-2 font-semibold">
          <TableCheckBox checked={isAllSelected} onChange={handleSelectAll} />
        </th>

        {commonHeaderColumns.map(renderHeaderCell)}
        {extraColumns.map(renderHeaderCell)}
        {activeTab === "1" || activeTab === "2"
          ? renderCountHeaderCell("Алдаа")
          : renderCountHeaderCell("Тоогоор")}
        <th className="px-3 py-2 font-semibold"></th>
      </tr>
    );
  };

  const renderCommonCells = (item) => (
    <>
      <td className="px-3 py-2 text-gray-700 whitespace-nowrap">
        {new Date(item.createdAt).getFullYear()}
      </td>
      <td className="px-3 py-2 text-gray-700 whitespace-nowrap">
        {getSeason(item.createdAt)}
      </td>
      <td className="px-3 py-2 text-gray-700 whitespace-nowrap">
        {getDateLabel(item.createdAt)}
      </td>
      <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
        {item.divisionName}
      </td>
      <td className="px-3 py-2 text-gray-700 whitespace-nowrap">
        {item.unitName}
      </td>
      <td className="px-3 py-2 font-medium text-gray-900 whitespace-nowrap">
        {item.firstName}
      </td>
    </>
  );

  const renderEditCell = (item) => (
    <td className="px-3 py-2 text-right whitespace-nowrap">
      <button
        data-id={item}
        onClick={() => handleEdit(item)}
        className="inline-flex items-center justify-center px-3 py-1.5 text-xs font-medium text-gray-700 uppercase transition bg-gray-100 rounded-lg hover:bg-indigo-600 hover:text-white focus:outline-none focus:ring-4 focus:ring-indigo-100"
      >
        Edit
      </button>
    </td>
  );

  const renderTableRow = (item, index) => {
    if (`${activeTab}` !== `${item.complain}`) return null;

    return (
      <tr
        key={item.id || JSON.stringify(item + index)}
        className="transition bg-white border-b border-gray-100 hover:bg-indigo-50/40"
      >
        <td className="px-3 py-2">
          <TableCheckBox
            checked={selectedIds.includes(item.id)}
            onChange={() => handleCheckboxChange(item.id)}
          />
        </td>

        {renderCommonCells(item)}

        {`${item.complain}` === "1" && (
          <>
            <td className="px-3 py-2 text-gray-700 whitespace-nowrap">
              {item.complainType}
            </td>
            <td className="px-3 py-2 text-gray-700 whitespace-nowrap">
              {item.phoneNo}
            </td>
            <td className="min-w-[240px] px-3 py-2 text-gray-700">
              {item.description}
            </td>
            <td className="px-3 py-2 text-gray-700 whitespace-nowrap">
              {renderPendingText(item.isSolved)}
            </td>
            <td className="min-w-[200px] px-3 py-2 text-gray-700">
              {renderPendingText(item.solvedDescription)}
            </td>
            <td className="px-3 py-2 font-semibold text-gray-900 whitespace-nowrap">
              {item.too}
            </td>
          </>
        )}

        {`${item.complain}` === "2" && (
          <>
            <td className="px-3 py-2 text-gray-700 whitespace-nowrap">
              {item.complainType}
            </td>
            <td className="px-3 py-2 text-gray-700 whitespace-nowrap">
              {item.phoneNo}
            </td>
            <td className="min-w-[240px] px-3 py-2 text-gray-700">
              {item.description}
            </td>
            <td className="px-3 py-2 text-gray-700 whitespace-nowrap">
              {renderPendingText(item.isSolved)}
            </td>
            <td className="px-3 py-2 font-semibold text-gray-900 whitespace-nowrap">
              {item.too}
            </td>
          </>
        )}

        {`${item.complain}` !== "1" && `${item.complain}` !== "2" && (
          <>
            <td className="px-3 py-2 text-gray-700 whitespace-nowrap">
              {item.complainType}
            </td>
            <td className="min-w-[240px] px-3 py-2 text-gray-700">
              {item.description}
            </td>
            <td className="px-3 py-2 text-gray-700 whitespace-nowrap">
              {item.rule}
            </td>
            <td className="px-3 py-2 font-semibold text-gray-900 whitespace-nowrap">
              {item.too}
            </td>
          </>
        )}

        {renderEditCell(item)}
      </tr>
    );
  };

  return (
    <div className="min-h-[calc(100%-56px)] w-full overflow-x-hidden bg-slate-50 md:w-[calc(100vw-250px)]">
      <div>
        <Modal
          show={showCreate}
          onHide={hideModalCreate}
          size="ml"
          style={modalWidthStyle(width)}
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton className="pb-0 border-0">
            <Modal.Title className="text-base font-semibold text-gray-900">
              Бүртгэл нэмэх
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="p-4 rounded-2xl bg-slate-50">
              <div className="mb-4">
                <p className="mb-1 text-sm font-semibold text-gray-900">
                  Бүртгэлийн төрөл
                </p>
                <p className="mb-3 text-xs text-gray-500">
                  Бүртгэл үүсгэх төрлөө сонгоно уу.
                </p>

                <Select
                  classname="text-black text-sm-center"
                  options={complainInfo}
                  defaultValue={selectedOption}
                  onChange={setSelectedOption}
                  className="outline-none"
                  classNamePrefix="!outline-none !hover:bg-red-100"
                  noOptionsMessage={({ inputValue }) =>
                    !inputValue && "Сонголт хоосон байна"
                  }
                  getOptionLabel={(option) => option.category}
                  getOptionValue={(option) => option.id}
                />
              </div>

              <div className="flex justify-end gap-2">
                <PageButton
                  type="button"
                  onClick={hideModalCreate}
                  className="text-gray-700 bg-white ring-1 ring-gray-200 hover:bg-gray-50 focus:ring-gray-100"
                >
                  Болих
                </PageButton>
                <PageButton
                  type="button"
                  onClick={handleCreate}
                  className="text-white bg-indigo-600 hover:bg-indigo-700 focus:ring-indigo-100"
                >
                  Next
                </PageButton>
              </div>
            </div>
          </Modal.Body>
        </Modal>

        <Modal
          show={showDelete}
          onHide={hideModalDelete}
          size="ml"
          backdrop="static"
          style={modalWidthStyle(width)}
          keyboard={false}
          aria-labelledby="contained-modal-title-vcenter"
          dialogClassName="modal-100w"
          centered
        >
          <Modal.Header closeButton className="pb-0 border-0">
            <Modal.Title className="text-base font-semibold text-gray-900">
              Бүртгэл устгах
            </Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div className="p-5 text-center rounded-2xl bg-red-50 ring-1 ring-red-100">
              <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 text-red-600 bg-red-100 rounded-full">
                <i className="text-xl bi bi-trash" />
              </div>

              <p className="mb-5 text-sm font-medium text-gray-600">
                Та сонгосон <b>{selectedIds?.length}</b> бүртгэлийг устгахдаа
                итгэлтэй байна уу?
              </p>

              <div className="flex justify-center gap-2">
                <PageButton
                  type="button"
                  onClick={deleteSelectedItems}
                  className="text-white bg-red-600 hover:bg-red-700 focus:ring-red-100"
                >
                  Тийм
                </PageButton>

                <PageButton
                  onClick={hideModalDelete}
                  type="button"
                  className="text-gray-700 bg-white ring-1 ring-gray-200 hover:bg-gray-50 focus:ring-gray-100"
                >
                  Үгүй
                </PageButton>
              </div>
            </div>
          </Modal.Body>
        </Modal>
      </div>

      <Navigation />

      <div className="max-w-full px-4 py-4 sm:px-5 lg:px-6">
        <div className="mb-3 overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-fuchsia-600 p-[1px] shadow-sm shadow-indigo-100">
          <div className="p-4 rounded-2xl bg-white/95">
            <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 mb-2 text-xs font-medium text-indigo-700 rounded-full bg-indigo-50 ring-1 ring-indigo-100">
                  <i className="bi bi-clipboard-check" />
                  Алдаа талархал
                </div>

                <h1 className="mb-1 text-lg font-semibold tracking-tight text-gray-900 sm:text-xl">
                  Алдаа, гомдол, талархлын бүртгэл
                </h1>

                <p className="mb-0 text-sm text-gray-500">
                  {activeCategory?.category
                    ? `${activeCategory.category} төрөл сонгогдсон.`
                    : "Бүртгэлүүдээ шүүж, засаж, татаж авах боломжтой."}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-2 sm:flex sm:items-center">
                <div className="px-3 py-2 rounded-xl bg-slate-50 ring-1 ring-gray-100">
                  <p className="mb-1 text-xs font-medium text-gray-400 uppercase">
                    Нийт мөр
                  </p>
                  <p className="mb-0 text-lg font-semibold text-gray-900">
                    {filteredData.length}
                  </p>
                </div>

                <div className="px-3 py-2 rounded-xl bg-indigo-50 ring-1 ring-indigo-100">
                  <p className="mb-1 text-xs font-medium text-indigo-400 uppercase">
                    Нийт тоо
                  </p>
                  <p className="mb-0 text-lg font-semibold text-indigo-700">
                    {too}
                  </p>
                </div>

                <PageButton
                  onClick={showModalCreate}
                  type="button"
                  className="col-span-2 bg-indigo-600 text-white hover:-translate-y-0.5 hover:bg-indigo-700 focus:ring-indigo-100 sm:col-span-1"
                >
                  <i className="bi bi-plus-lg" />
                  Бүртгэл нэмэх
                </PageButton>
              </div>
            </div>
          </div>
        </div>

        <div className="p-3 mb-3 bg-white shadow-sm rounded-2xl ring-1 ring-gray-100">
          <div className="flex flex-col min-w-0 gap-3 xl:flex-row xl:items-center xl:justify-between">
            <div className="relative w-full min-w-0 xl:max-w-md">
              <span className="absolute inset-y-0 left-0 flex items-center pl-4 text-gray-400 pointer-events-none">
                <i className="bi bi-search" />
              </span>
              <input
                value={searchQuery}
                onChange={handleSearch}
                className="w-full py-2 pr-4 text-sm font-medium text-gray-800 transition border border-gray-200 outline-none h-11 rounded-xl bg-slate-50 pl-11 placeholder:text-gray-400 focus:border-indigo-300 focus:bg-white focus:ring-4 focus:ring-indigo-50"
                placeholder="Ажилтны нэрээр хайх..."
                type="text"
              />
            </div>

            <div className="flex flex-wrap items-center min-w-0 gap-2">
              <FilterDropdown title="Оноор ялгах" variant="primary">
                <FilterItem onClick={() => handleYearChange()} value="All">
                  Бүгд
                </FilterItem>
                {uniqueYears.map((year) => (
                  <FilterItem
                    onClick={() => handleYearChange(year)}
                    key={year}
                    value={year}
                  >
                    {year}
                  </FilterItem>
                ))}
              </FilterDropdown>

              <FilterDropdown title="Улиралаар ялгах" variant="success">
                <FilterItem onClick={() => handleSeasonChange()} value="All">
                  Бүгд
                </FilterItem>
                {uniqueSeasons.map((season, indexD) => (
                  <FilterItem
                    onClick={() => handleSeasonChange(season)}
                    key={JSON.stringify(season + indexD)}
                    value={season}
                  >
                    {season}
                  </FilterItem>
                ))}
              </FilterDropdown>

              <FilterDropdown title="Хэлтэсээр ялгах" variant="warning">
                <FilterItem onClick={() => handleDivisionChange()} value="All">
                  Бүгд
                </FilterItem>
                {uniqueDivisionNames.map((divisionName, indexF) => (
                  <FilterItem
                    onClick={() => handleDivisionChange(divisionName)}
                    key={JSON.stringify(divisionName + indexF)}
                    value={divisionName}
                  >
                    {divisionName}
                  </FilterItem>
                ))}
              </FilterDropdown>

              <div className="hidden w-px h-8 bg-gray-200 sm:block" />

              <PageButton
                onClick={showModalDelete}
                disabled={selectedIds.length === 0}
                className="text-white bg-red-600 hover:bg-red-700 focus:ring-red-100"
              >
                <i className="bi bi-trash" />
                Delete
              </PageButton>

              <PageButton
                onClick={handleDownloadClick}
                className="text-white bg-emerald-600 hover:bg-emerald-700 focus:ring-emerald-100"
              >
                <i className="bi bi-file-earmark-excel" />
                Download
              </PageButton>
            </div>
          </div>
        </div>

        <div className="px-3 pt-3 mb-3 bg-white shadow-sm rounded-2xl ring-1 ring-gray-100">
          <div className="flex flex-wrap gap-2 pb-3 border-b border-gray-100">
            {complainInfo.map((item, custom) => {
              const isActive = `${activeTab}` === `${item.id}`;

              return (
                <button
                  key={JSON.stringify(item + custom)}
                  onClick={() => setActiveTab(`${item.id}`)}
                  className={`inline-flex items-center rounded-xl px-3 py-2 text-sm font-medium transition-all duration-200 ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-sm shadow-indigo-100"
                      : "bg-slate-50 text-gray-600 hover:bg-indigo-50 hover:text-indigo-700"
                  }`}
                >
                  {item.category}
                  {isActive ? (
                    <span className="ml-2 inline-flex min-w-[24px] items-center justify-center rounded-full bg-white/20 px-2 py-0.5 text-xs font-medium text-white">
                      {niitAldaa.length}
                    </span>
                  ) : (
                    ""
                  )}
                </button>
              );
            })}
          </div>
        </div>

        <div className="max-w-full overflow-hidden bg-white shadow-sm rounded-2xl ring-1 ring-gray-100">
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <div>
              <p className="mb-1 text-sm font-semibold text-gray-900">
                Бүртгэлийн жагсаалт
              </p>
              <p className="mb-0 text-xs text-gray-500">
                Сонгосон: {selectedIds.length} · Харагдаж буй:{" "}
                {currentRecords.length}
              </p>
            </div>
          </div>

          <div className="w-full overflow-x-auto">
            <table id="table" className="break-words border-collapse min-w-max">
              <thead>{renderTableHead()}</thead>

              <tbody className="text-sm divide-y divide-gray-100">
                {currentRecords.length > 0 ? (
                  currentRecords.map(renderTableRow)
                ) : (
                  <tr>
                    <td colSpan="20" className="px-6 text-center py-14">
                      <div className="flex flex-col items-center max-w-sm mx-auto">
                        <div className="flex items-center justify-center mb-4 text-gray-400 rounded-full h-14 w-14 bg-slate-100">
                          <i className="text-2xl bi bi-inbox" />
                        </div>
                        <p className="mb-1 text-base font-semibold text-gray-900">
                          Мэдээлэл олдсонгүй
                        </p>
                        <p className="mb-0 text-sm text-gray-500">
                          Хайлт эсвэл filter тохиргоогоо өөрчлөөд дахин шалгана
                          уу.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          {/* {filteredData.length > 9 ? (
            <div className="mt-3">
              <Pagination
                nPages={nPages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </div>
          ) : (
            ""
          )} */}
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}

export default ErrorThanks;
