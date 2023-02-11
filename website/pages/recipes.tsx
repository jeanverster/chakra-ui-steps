import { Page } from "@/layouts";
import { Code, Divider, Link, Spacer, Text } from "@chakra-ui/react";
import dynamic from "next/dynamic";
import { useMemo } from "react";
import Balancer from "react-wrap-balancer";
import { ReactHookFormExample } from "../code-samples/recipes";
import LazyRender from "../components/LazyRender/LazyRender";
import { dirToFileArray } from "../mdx/server";
import { useVariantContext } from "./_app";

type RecipesProps = {
  recipes: any[];
};

const DynamicSectionWrap = dynamic(
  () => import("../containers/CodePreview/CodePreview"),
  {
    ssr: false,
  }
);

export const getStaticProps = async () => {
  const recipes = dirToFileArray();
  return {
    props: {
      recipes,
    },
  };
};

const getJSXDescription = (dir: string): JSX.Element => {
  switch (dir) {
    case "react-hook-form":
      return (
        <Text>
          <Balancer>
            Here you can see how to use <Code>chakra-ui-steps</Code> with{" "}
            <Code>react-hook-form</Code>, including common requirements such as
            validation and error handling. Make sure you have installed{" "}
            <Link
              target="_blank"
              rel="noopener noreferrer"
              color="teal.400"
              href={"https://react-hook-form.com/get-started"}
            >
              react-hook-form
            </Link>
            .
          </Balancer>
        </Text>
      );
    default:
      return <></>;
  }
};

const Recipes = ({ recipes }: RecipesProps) => {
  const [variant] = useVariantContext();

  const renderRecipes = useMemo(() => {
    return recipes.map((recipe, index) => {
      const description = getJSXDescription(recipe.dir);
      return (
        <>
          <LazyRender key={`${recipe.fileName}-${index}`} rootMargin="100px">
            <DynamicSectionWrap
              title={recipe.dir}
              preview={<ReactHookFormExample variant={variant} />}
              description={description}
              code={recipe.files}
            />
          </LazyRender>
          {index !== recipes.length - 1 ? (
            <Divider sx={{ my: 10 }} />
          ) : (
            <Spacer pt={12} />
          )}
        </>
      );
    });
  }, [recipes, variant]);

  return (
    <Page
      title="Recipes"
      metaDescription="Steps component designed to work seamlessly with Chakra UI"
      description="Common recipes for using chakra-ui-steps in your Next.js application."
    >
      {renderRecipes}
    </Page>
  );
};

export default Recipes;
