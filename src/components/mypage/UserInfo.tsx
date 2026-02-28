interface UserInfoProps {
    name: string;
    sno: string;
    dept: string;
}

export default function UserInfo({ name, sno, dept }: UserInfoProps) {
    return (
        <section className="flex flex-col gap-[15px]">
            <p className="body-t1">내 정보</p>
            <article className="flex flex-col gap-[5px]">
                <p className="body-t1">{name}</p>
                <div className="flex gap-1.5 body-t3">
                    <div className="flex gap-1">
                        <span className="text-background-300">학번</span>
                        <span>{sno}</span>
                    </div>
                    <span className="text-background-300">&#183;</span>
                    <div className="flex gap-1">
                        <span className="text-background-300">학과</span>
                        <span>{dept}</span>
                    </div>
                </div>
            </article>
        </section>
    );
}
