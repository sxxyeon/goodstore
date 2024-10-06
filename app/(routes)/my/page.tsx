"use client";
import ContHeader from "@/components/common/ContHeader";
import OneButton from "@/components/common/OneButton";
import CancelList from "@/components/my/CancelList";
import LikedList from "@/components/my/LikedList";
import OrderList from "@/components/my/OrderList";
import React, { useState } from "react";

const MyPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>("주문내역");
  const tabs = ["주문내역", "취소내역", "찜 목록"];
  const renderContent = () => {
    switch (selectedTab) {
      case "주문내역":
        return <OrderList />;
      case "취소내역":
        return <CancelList />;
      case "찜 목록":
        return <LikedList />;
      default:
        return null;
    }
  };

  const isSelected = (tab: string) => selectedTab === tab;

  return (
    <ContHeader title="주문 내역">
      <div className="flex flex-row mt-10 hidden">
        {tabs.map((tab) => (
          <OneButton
            key={tab}
            text={tab}
            onClick={() => setSelectedTab(tab)}
            type={`${isSelected(tab) ? "dark" : "light"}`}
          />
        ))}
      </div>
      <div className="content mt-8">
        <OrderList />
      </div>
      {/* <div className="content">{renderContent()}</div> */}
    </ContHeader>
  );
};

export default MyPage;
