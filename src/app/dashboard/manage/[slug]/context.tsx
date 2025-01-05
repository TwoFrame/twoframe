import { createContext } from "react";
import { TournamentContextType } from "../../tournaments/types";

const TournamentContext = createContext<TournamentContextType | null>(null);
export default TournamentContext;
