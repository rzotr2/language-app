export const HintCard = () => {
    return (
        <div className="sm:max-w-[58%] flex-1 h-[170px] min-w-[214px]">
            <div className="flex flex-col justify-center py-2 px-4 bg-white border border-gray-200 rounded-lg
                                                shadow-sm cursor-default h-full">
                <h5 className="pb-2 text-md font-bold tracking-tight text-gray-900">Hint:</h5>
                <ul className="leading-0 space-y-1">
                    <li>
                        <p className="text-sm font-bold inline">{`Easy:\n`}</p>
                        <p className="text-sm font-normal inline">Simple sentences and basic vocabulary.</p>
                    </li>
                    <li>
                        <p className="text-sm font-bold inline">{`Medium:\n`}</p>
                        <p className="text-sm font-normal inline">More complex structures and new words.</p>
                    </li>
                    <li>
                        <p className="text-sm font-bold inline">{`Hard:\n`}</p>
                        <p className="text-sm font-normal inline">Advanced topics, complex grammar, and expressions.</p>
                    </li>
                </ul>
            </div>
        </div>
    )
}