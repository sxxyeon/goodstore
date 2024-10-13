"use client";
import ContHeader from "@/components/common/ContHeader";
import OneButton from "@/components/common/OneButton";
import CancelList from "@/components/my/CancelList";
import LikedList from "@/components/my/LikedList";
import OrderList from "@/components/my/OrderList";
import React, { useState } from "react";

const MyPage = () => {
  const [selectedTab, setSelectedTab] = useState<string>("주문내역");
  const tabs = ["주문내역", "찜 목록"];
  const renderContent = () => {
    switch (selectedTab) {
      case "주문내역":
        return <OrderList />;
      case "찜 목록":
        return <LikedList />;
      default:
        return null;
    }
  };

  const isSelected = (tab: string) => selectedTab === tab;

  return (
    <ContHeader title="마이 페이지">
      <div className="flex flex-row items-center justify-center mt-10">
        {tabs.map((tab) => (
          <OneButton
            key={tab}
            text={tab}
            onClick={() => setSelectedTab(tab)}
            type={`${isSelected(tab) ? "dark" : "light"}`}
          />
        ))}
      </div>
      <div className="content mt-8">{renderContent()}</div>
    </ContHeader>
  );
};

export default MyPage;
