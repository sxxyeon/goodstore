"use client";
import ContHeader from "@/components/common/ContHeader";
import OneButton from "@/components/common/OneButton";
import { useRouter } from "next/navigation";
import React from "react";

const SuccessPage = () => {
  const router = useRouter();
  return (
    <div className="mt-36 px-3 mx-auto text-center">
      <h5 className="text-lg font-bold py-20">결제가 완료되었습니다</h5>
      <OneButton text="주문내역 바로가기" onClick={() => router.push("/my")} />
    </div>
  );
};

export default SuccessPage;
