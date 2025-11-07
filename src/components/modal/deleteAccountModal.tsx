export default function DeleteAccountModal() {
    return (
        <>
            <p className="body-t1 text-accent text-center">탈퇴안내</p>
            <div className="flex flex-col body-t3 text-center">
                <span>탈퇴 버튼 선택 시,</span>
                <span>계정은 삭제되며 복구되지 않습니다.</span>
            </div>
            <button className="text-center w-full py-2.5 rounded-[10px] text-white bg-accent">
                탈퇴하기
            </button>
        </>
    );
}
