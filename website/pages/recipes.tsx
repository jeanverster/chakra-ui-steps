import { Page } from "@/layouts";
import { Divider } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { ReactHookFormExample } from "../code-samples/recipes";
import LazyRender from "../components/LazyRender/LazyRender";
import { dirToFileArray } from "../mdx/server";
import { useVariantContext } from "./_app";

type RecipesProps = {
  recipes: any[];
};

const DynamicSectionWrap = dynamic(
  () => import("../containers/SectionWrap/SectionWrap"),
  {
    ssr: false,
  }
);

export const getStaticProps = async () => {
  const recipes = dirToFileArray();
  console.log("recipes", recipes);
  return {
    props: {
      recipes,
    },
  };
};

const Recipes = ({ recipes }: RecipesProps) => {
  console.log("recipes", recipes);
  const [variant] = useVariantContext();
  const renderRecipes = () => {
    return recipes.map((recipe, index) => {
      return (
        <>
          <LazyRender key={`${recipe.fileName}-${index}`} rootMargin="100px">
            <DynamicSectionWrap
              title={recipe.dir}
              description=""
              preview={<ReactHookFormExample variant={variant} />}
              code={recipe.files}
            />
          </LazyRender>
          <Divider sx={{ my: 10 }} />
        </>
      );
    });
  };
  return (
    <Page
      title="Recipes"
      metaDescription="Steps component designed to work seamlessly with Chakra UI"
      description="Common recipes for using chakra-ui-steps in your Next.js application."
    >
      {renderRecipes()}
    </Page>
  );
};

export default Recipes;
