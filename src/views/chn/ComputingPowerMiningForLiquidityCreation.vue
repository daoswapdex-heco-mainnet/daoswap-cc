<template>
  <div class="fill-height">
    <v-container v-if="web3 && connected" class="fill-height">
      <v-row justify="center">
        <v-col md="6">
          <!-- 公告 -->
          <v-card justify="center" class="fill-width">
            <v-card-title>
              <span class="title font-weight-bold text-h5">
                {{ $t("Activities") }}
              </span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row align="center">
                <v-col class="body-1" cols="12">
                  <!-- <p>{{ $t("Power Duration") }}：{{ powerDuration }}</p> -->
                  <p>
                    {{
                      $t(
                        "Will caculate and airdrop within 3 workdays after the last day."
                      )
                    }}
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <!-- 操作 -->
          <v-card class="fill-width mt-10">
            <v-card outlined>
              <!-- 标题 -->
              <v-card-title>
                <v-avatar size="24" class="mr-2">
                  <img :src="require('@/assets/logo.png')" alt="DAO" />
                </v-avatar>
                <span class="title font-weight-bold text-h5">
                  {{ $t("Competition Mining") }}
                </span>
              </v-card-title>
              <v-divider></v-divider>
              <v-card-text v-if="powerDataList.length > 0">
                <v-card
                  v-for="item in powerDataList"
                  :key="item.account"
                  :loading="loading"
                  class="ma-2"
                >
                  <v-card-title>
                    {{ $t("Power Phase") }}
                    {{ item.periodId }}
                    {{ $t("Power Expect") }}
                  </v-card-title>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-text>
                    <p>
                      {{ $t("Power Duration") }}：{{
                        item.startTime | parseTime("{y}-{m}-{d}")
                      }}
                      ~
                      {{ item.endTime | parseTime("{y}-{m}-{d}") }}
                    </p>
                    <p>{{ $t("Power All Hash") }}：{{ item.countedPower }}</p>
                    <p>
                      {{ $t("Power Node Proportion") }}：{{
                        item.annualizedRate
                      }}
                      %
                    </p>
                    <!-- <p>
                      {{ $t("Power Node Hash Value") }}：$
                      {{ item.countedPowerValue }}
                    </p> -->
                    <p>
                      {{ $t("Power Node Status") }}：{{
                        $t(`Node.${item.powerInfo.nodeType}`)
                      }}
                    </p>
                    <!-- <p>
                      {{ $t("Power DAO-USDT Liquidity Value") }}：{{
                        item.powerInfo.liquidity
                      }}
                    </p> -->
                    <p>
                      {{ $t("Claimable Amount") }} /
                      {{ $t("Claimabled Amount") }}：{{
                        item.powerInfo.isClaim
                          ? 0
                          : item.powerInfo.receiveAmount
                      }}
                      /
                      {{
                        item.powerInfo.isClaim
                          ? item.powerInfo.receiveAmount
                          : 0
                      }}
                      {{ tokenSymbol }}
                    </p>
                  </v-card-text>
                  <v-divider class="mx-4"></v-divider>
                  <v-card-actions class="justify-center">
                    <v-btn
                      color="#93B954"
                      dark
                      width="80%"
                      @click="handleRelease(item)"
                      :disabled="item.powerInfo.isClaim"
                    >
                      {{ $t("Claim") }}
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-card-text>
              <v-card-text v-else>
                <v-row align="center">
                  <v-col class="body-3" cols="12">
                    {{ $t("No Data") }}
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-card>
          <!-- 当前钱包账号 -->
          <v-card justify="center" class="fill-width mt-10">
            <v-card-title>
              <span class="title font-weight-bold text-h5">
                {{ $t("Current Token Address") }}
              </span>
            </v-card-title>
            <v-divider></v-divider>
            <v-card-text>
              <v-row align="center">
                <v-col
                  class="body-1"
                  cols="12"
                  @click="handleCopy(address, $event)"
                >
                  <p>
                    {{ address }}
                    <v-icon>mdi-content-copy</v-icon>
                  </p>
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
          <!-- 遮罩层 -->
          <v-overlay z-index="9999" opacity="0.7" :value="loading">
            <v-progress-circular indeterminate size="64"></v-progress-circular>
          </v-overlay>
          <!-- 提示层 -->
          <v-snackbar
            v-model="operationResult.snackbar"
            :color="operationResult.color"
            centered
            top
            timeout="4000"
          >
            {{ $t(operationResult.text) }}
          </v-snackbar>
        </v-col>
      </v-row>
    </v-container>
    <v-container v-else>
      <v-row justify="center">
        <v-col md="6">
          <v-card justify="center" class="fill-width">
            <v-card-actions class="justify-center">
              <!-- 连接钱包 -->
              <v-btn
                class="mr-2"
                v-if="!connected"
                color="#93B954"
                block
                @click="onConnect"
              >
                {{ $t("Connect Wallet") }}
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import clip from "@/utils/clipboard";
import { getContract, weiToEther } from "@/utils/web3";
import { judgeCHNNodeTypeByValue, compare } from "@/filters/index";
// 引入合约 ABI 文件
import ComputingPowerMining from "@/constants/contractJson/ComputingPowerMiningForLiquidityCreation.json";

export default {
  name: "ComputingPowerMiningForLiquidityCreation",
  data: () => ({
    loading: false,
    tokenSymbol: "DST",
    // 算力合约列表
    powerDuration: "2022-04-01 11:00:00 ~ 2022-04-28 11:00:00",
    powerContractAddressList: [
      {
        id: 1,
        address: "0xb18C7e2ba4C5cdA22B3EF5E6294Ae0A8B538fFD2"
      },
      {
        id: 2,
        address: "0xdd500Bfa0640e07b940F5770b4CbFAb15DB2Fefc"
      },
      {
        id: 3,
        address: "0x19779B08E25A10824a9739AFEc8a77756DC78878"
      },
      {
        id: 4,
        address: "0x065D29Bb43B8b7996656AaCac357F7e3A70a06E4"
      },
      {
        id: 5,
        address: "0x06f61289DAE9FFC7a1C6A376F8D63E4795204f3a"
      },
      {
        id: 6,
        address: "0x08a2a6100470c7935e65618f92f9B81B43Ced79C"
      },
      {
        id: 7,
        address: "0x2Af4E7609bCBF802e2D88176723bfe3870E1e668"
      },
      {
        id: 8,
        address: "0xA235cB043309C2e1a5482d9c962Fbf5E5Ea61AA5"
      },
      {
        id: 9,
        address: "0x585836ceF0DC34841318d61E4c022eCf857cA762"
      },
      {
        id: 10,
        address: "0xe5CB6AD15f00c341e639394e84C832d49dEC7657"
      }
    ],
    // 算力数据列表
    powerDataList: [],
    // 提示框
    operationResult: {
      color: "success",
      snackbar: false,
      text: `Hello`
    }
  }),
  created() {
    if (this.web3 && this.connected) {
      this.getPowerDataList();
    } else {
      this.onConnect();
    }
  },
  watch: {
    web3(web3) {
      if (web3) {
        this.getPowerDataList();
      }
    },
    address(address) {
      if (address) {
        this.getPowerDataList();
      }
    }
  },
  computed: {
    connected() {
      return this.$store.state.web3.connected;
    },
    web3() {
      return this.$store.state.web3.web3;
    },
    address() {
      // return "0xe704Bac32967D1FA457cdB65520240277E006f5A";
      return this.$store.state.web3.address;
    }
  },
  methods: {
    // 连接钱包 OK
    onConnect() {
      this.$store.dispatch("web3/connect");
    },
    // 断开连接钱包 OK
    closeWallet() {
      this.$store.dispatch("web3/closeWallet");
    },
    // 复制地址
    handleCopy(text, event) {
      clip(text, event);
      this.operationResult.color = "success";
      this.operationResult.snackbar = true;
      this.operationResult.text = "Cope Success";
    },
    // 获取算力数据列表
    async getPowerDataList() {
      if (this.powerContractAddressList.length > 0) {
        this.powerDataList = [];
        this.loading = true;
        const getResult = this.powerContractAddressList.map(async item => {
          const contract = await getContract(
            ComputingPowerMining,
            item.address,
            this.web3
          );
          const hasPowerInfo = await contract.methods
            .hasPowerInfo(this.address)
            .call();
          if (hasPowerInfo) {
            const countedPower = await contract.methods.countedPower().call();
            const countedPowerValue = await contract.methods
              .countedPowerValue()
              .call();
            const startTime = await contract.methods.startTime().call();
            const endTime = await contract.methods.endTime().call();
            const powerInfo = await contract.methods
              .accountPowerInfoList(this.address)
              .call();
            const annualizedRate = (powerInfo.power / countedPower) * 100;
            const tempData = {
              periodId: item.id,
              contractAddress: item.address,
              countedPower: weiToEther(countedPower, this.web3),
              countedPowerValue: weiToEther(countedPowerValue, this.web3),
              startTime: startTime,
              endTime: endTime,
              powerInfo: {
                power: weiToEther(powerInfo.power, this.web3),
                powerValue: weiToEther(powerInfo.powerValue, this.web3),
                receiveAmount: weiToEther(powerInfo.receiveAmount, this.web3),
                nodeType: judgeCHNNodeTypeByValue(powerInfo.nodeType),
                liquidity: weiToEther(powerInfo.liquidity, this.web3),
                isClaim: powerInfo.isClaim
              },
              annualizedRate: parseFloat(annualizedRate).toFixed(2)
            };
            this.powerDataList.push(tempData);
          }
        });
        await Promise.all(getResult);
        this.powerDataList.sort(compare("periodId"));
        this.loading = false;
      }
    },
    // 提取DAO
    handleRelease(record) {
      this.loading = true;
      // 执行合约
      getContract(ComputingPowerMining, record.contractAddress, this.web3)
        .methods.claim()
        .send({ from: this.address })
        .then(() => {
          this.loading = false;
          this.operationResult.snackbar = true;
          this.operationResult.text = "Claim Success";
          // 重新获取数据
          this.getPowerDataList();
        })
        .catch(e => {
          this.loading = false;
          console.info(e);
        });
    }
  }
};
</script>

<style lang="sass">
.theme--dark.v-btn.v-btn--disabled.v-btn--has-bg
  background-color: rgb(147, 185, 84) !important
  border-color: rgb(147, 185, 84) !important
  opacity: 0.5 !important

.v-btn--disabled
  background-color: rgb(147, 185, 84)
  border-color: rgb(147, 185, 84)
  opacity: 0.5
</style>
