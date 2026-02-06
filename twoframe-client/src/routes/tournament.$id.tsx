// import { createFileRoute, redirect } from "@tanstack/react-router";
// // import { createFileRoute, redirect } from "@tanstack/react-router";
// import { useQuery } from "@tanstack/react-query";
// // import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
// // import { Button } from "@/components/ui/button";
// // import { JoinForm } from "@/components/joinForm";

// export const Route = createFileRoute("/tournament/$id")({
//   beforeLoad: async ({ params }) => {
//     const { id } = params;
//     const response = await fetch(
//       `${import.meta.env.VITE_TWOFRAME_SERVER_URL}/tournament/${id}`,
//     );
//     if (!response.ok) {
//       throw redirect({
//         to: "/",
//       });
//     }
//   },
//   component: TournamentPage,
// });

// function TournamentPage() {
//   const { id } = Route.useParams();
//   const tournament = useQuery({
//     queryKey: ["tournament", id],
//     queryFn: async () => {
//       const response = await fetch(
//         `${import.meta.env.VITE_TWOFRAME_SERVER_URL}/tournament/${id}`,
//         {
//           method: "GET",
//           headers: { "Content-Type": "application/json" },
//         },
//       );
//       const data = await response.json();
//       return data;
//     },
//     retry: 3,
//   });

//   return (
//     <>
//       <h1>{tournament.data?.name}</h1>
//       <p>{tournament.data?.date}</p>
//     </>
//   );
// }
