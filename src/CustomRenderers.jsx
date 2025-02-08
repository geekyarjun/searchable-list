// CustomRenderers.js
import React from "react";
import styled from "styled-components";

const CustomSectionHeader = styled.div`
  background-color: #f0f0f0;
  font-weight: bold;
  padding: 10px;
  cursor: pointer;
`;

const CustomListItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #ddd;
`;

export const renderCustomSectionHeader = (section) => (
  <CustomSectionHeader>{section.title}</CustomSectionHeader>
);

export const renderCustomItem = (item) => (
  <CustomListItem>{item.name}</CustomListItem>
);
