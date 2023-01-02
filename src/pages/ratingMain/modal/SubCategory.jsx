function SubCategory(it) {
    return (
        <div className=" flex justify-between py-2">
            <span className=" font-[500] text-[13px]">{it.it.name}</span>
            <span className=" font-[500] text-[13px]">Оноо: {it.it.maxPoints}</span>
        </div>
    );
}

export default SubCategory;