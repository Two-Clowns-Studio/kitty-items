import * as t from "@onflow/types";
import * as fcl from "@onflow/fcl";
import { FlowService } from "./flow";
import { mintKibblesTemplate } from "../templates";

class KibblesService {
  constructor(private readonly flowService: FlowService) {}
  async mintKibblesToAddress(
    destinationAddress: string,
    amount: string
  ): Promise<string> {
    const authorization = this.flowService.authorizeMinter();
    const response = await fcl.send([
      fcl.transaction`
        ${mintKibblesTemplate}
      `,
      fcl.args([
        fcl.arg(destinationAddress, t.Address),
        fcl.arg(amount, t.UInt),
      ]),
      fcl.proposer(authorization),
      fcl.payer(authorization),
      fcl.limit(100),
    ]);

    return await fcl.tx(response).onceExecuted();
  }
}

export { KibblesService };