import { Link } from "react-router-dom";
import "./Breadcrumb.css";

export type BreadcrumbType = {
  name: string;
  link: string;
};

const Breadcrumb = (props: { crumbs: BreadcrumbType[] }) => {
  return (
    <div id="breadcrumb">
      {props.crumbs.map((e, idx) => {
        return (
          <span className="crumb" key={idx}>
            <Link to={e.link}>
              {idx === props.crumbs.length - 1 ? e.name : `${e.name} > `}
            </Link>
          </span>
        );
      })}
    </div>
  );
};

export default Breadcrumb;
