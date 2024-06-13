import AspectRatio from "@mui/joy/AspectRatio";
import Card from "@mui/joy/Card";
import CardContent from "@mui/joy/CardContent";
import CardOverflow from "@mui/joy/CardOverflow";
import Divider from "@mui/joy/Divider";
import Skeleton from "@mui/joy/Skeleton";
import Stack from "@mui/joy/Stack";
import Typography from "@mui/joy/Typography";

export default function EventCardLoading() {
  const MAX_LENGTH_TITLE_PLACEHOLDER =
    "######################## ##############################";
  const MAX_LENGTH_ORGANIZER_PLACEHOLDER = "########### ###########";

  return (
    <Card
      sx={{
        minHeight: {
          xs: "300px",
          md: "350px",
          lg: "320px",
        },
      }}
    >
      <CardOverflow>
        <AspectRatio minHeight="120px" maxHeight="200px">
          <Skeleton
            animation={`${import.meta.env.VITE_SKELETON_ANIMATION_TYPE}`}
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent sx={{ gap: 1, paddingTop: "7px" }}>
        <Typography level="title-lg">
          <Skeleton
            animation={`${import.meta.env.VITE_SKELETON_ANIMATION_TYPE}`}
          >
            {MAX_LENGTH_TITLE_PLACEHOLDER}
          </Skeleton>
        </Typography>
        <Typography level="body-sm">
          <Skeleton
            animation={`${import.meta.env.VITE_SKELETON_ANIMATION_TYPE}`}
          >
            {MAX_LENGTH_ORGANIZER_PLACEHOLDER}
          </Skeleton>
        </Typography>
      </CardContent>

      <CardOverflow variant="soft">
        <Divider inset="context" />
        <CardContent
          orientation="horizontal"
          sx={{
            columnGap: "0.5rem",
          }}
        >
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography level="body-xs" fontWeight="md">
              <Skeleton
                animation={`${import.meta.env.VITE_SKELETON_ANIMATION_TYPE}`}
              >
                ###
              </Skeleton>
            </Typography>
          </Stack>
          <Divider orientation="vertical" />
          <Stack direction="row" alignItems="center" spacing={0.5}>
            <Typography level="body-xs" fontWeight="md">
              <Skeleton
                animation={`${import.meta.env.VITE_SKELETON_ANIMATION_TYPE}`}
              >
                ##.##.####, ##;##
              </Skeleton>
            </Typography>
          </Stack>
        </CardContent>
      </CardOverflow>
    </Card>
  );
}
