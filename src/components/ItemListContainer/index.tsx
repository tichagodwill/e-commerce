import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Grid } from "@mui/material";
import ItemCard from "../ItemCard";
import { IItem } from "../../interfaces/IItem";
import "@/assets/css/ItemListContainer.css";

const ItemListContainer = () => {
  const { category } = useParams();
  const [items, setItems] = useState<IItem[]>([]);

  const getItemsByType = async () => {
    try {
      await fetch("http://localhost:8080/src/assets/data/items.json").then(async (response) => {
        const items = await response.json();
        items && category
          ? setItems(items.filter((item: IItem) => item.category === category))
          : setItems(items);
      });
    } catch (error) {
      console.log("Error getting items: ", error);
    }
  };

  useEffect(() => {
    getItemsByType();
  }, [category]);

  return (
    <>
      <Grid
        className="list-items-grid"
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 2, sm: 12, md: 16 }}
        paddingTop={10}
      >
        {items.map((itemToShow: IItem, index: number) => (
          <Grid item xs={2} sm={4} md={4} key={index}>
            <ItemCard item={itemToShow} />
          </Grid>
        ))}
      </Grid>
    </>
  );
};

export default ItemListContainer;
