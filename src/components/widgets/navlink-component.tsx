import { NavLink } from "@mantine/core"
import { Link } from "react-router-dom"
import type { ReactElement } from "react";

type TProps = {
    link: string;
    label: string;
    icon: ReactElement;
}

export const NavlinkComponent = (props: TProps) => {
    const { link, label, icon } = props;

    return <Link style={{
        height: "100%"
    }} to={link}>
        <NavLink p="xl" label={label} icon={icon} />
    </Link>
}