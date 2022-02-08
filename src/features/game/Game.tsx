import React, { useContext } from "react";
import { Modal } from "react-bootstrap";
import { useActor } from "@xstate/react";

import { Hud } from "features/hud/Hud";
import { Crops } from "features/crops/Crops";
import { Blacksmith } from "features/blacksmith/Blacksmith";
import { Mail } from "features/mail/Mail";
import { Water } from "features/water/Water";
import { Loading } from "features/auth/components";
import { Animals } from "features/animals/Animals";

import { useInterval } from "lib/utils/useInterval";

import { Context } from "./GameProvider";
import { Panel } from "components/ui/Panel";
import { ToastManager } from "./toast/ToastManager";

import { GameError } from "./components/GameError";
import { Decorations } from "./components/Decorations";
import { Minting } from "./components/Minting";
import { Success } from "./components/Success";
import { Syncing } from "./components/Syncing";

const AUTO_SAVE_INTERVAL = 1000 * 30; // autosave every 30 seconds

export const Game: React.FC = () => {
  const { gameService } = useContext(Context);
  const [gameState, send] = useActor(gameService);

  useInterval(() => send("SAVE"), AUTO_SAVE_INTERVAL);

  return (
    <>
      <ToastManager />

      <Modal show={gameState.matches("loading")} centered>
        <Panel className="text-shadow">
          <Loading />
        </Panel>
      </Modal>

      <Modal show={gameState.matches("error")} centered>
        <Panel>
          <GameError />
        </Panel>
      </Modal>

      <Modal show={gameState.matches("minting")} centered>
        <Panel>
          <Minting />
        </Panel>
      </Modal>

      <Modal show={gameState.matches("success")} centered>
        <Panel>
          <Success />
        </Panel>
      </Modal>

      <Modal show={gameState.matches("syncing")} centered>
        <Panel>
          <Syncing />
        </Panel>
      </Modal>

      <Hud />

      <Blacksmith />
      <Mail />
      <Crops />
      <Water />
      <Animals />
      <Decorations />
    </>
  );
};
