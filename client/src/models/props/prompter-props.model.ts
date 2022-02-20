import React from "react";

interface IconProps {
  childComp?: React.ReactNode
  className: any
}

export interface IPrompterProps {
  title: string,
  route: string,
  Icon: React.FC<IconProps>
}