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
                  {{ $t("Hash Mining") }}
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
                      {{ item.powerInfo.powerValue }}
                    </p> -->
                    <p>
                      {{ $t("Power Node Status") }}：{{
                        $t(`Node.${item.powerInfo.nodeType}`)
                      }}
                    </p>
                    <!-- <p>
                      {{ $t("Power DAO-USDT Liquidity Value") }}：$
                      {{ item.powerInfo.liquidity }}
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
import ComputingPowerMining from "@/constants/contractJson/ComputingPowerMiningForLiquidity.json";

export default {
  name: "ComputingPowerMiningForLiquidity",
  data: () => ({
    loading: false,
    tokenSymbol: "DAO",
    // 算力合约列表
    powerDuration: "2022-04-01 11:00:00 ~ 2022-04-28 11:00:00",
    powerContractAddressList: [
      {
        id: 1,
        address: "0x486a483adDf8446AE2412A1E9bf30D1A90f0e026"
      },
      {
        id: 2,
        address: "0x84892cb24159d3DBdB9b704c4c5a86b52d21D915"
      },
      {
        id: 3,
        address: "0x2B2F68df4B8DDae04ACCDd15470c9f2cC8e1f926"
      },
      {
        id: 4,
        address: "0xd667bAE20e4dBF36099ECA20240201aed3c4e77f"
      },
      {
        id: 5,
        address: "0x2EC0d8465af466c57F75Bf166a5180Fd7B0c513e"
      },
      {
        id: 6,
        address: "0x15485AAb318c60d01a57934ADE5a28282314f0Ce"
      },
      {
        id: 7,
        address: "0x0B37cA4489AE9f667A103D9FE98E306185715891"
      },
      {
        id: 8,
        address: "0x3740314E93D613787b14Dc67958A0dcFC1c167A2"
      },
      {
        id: 9,
        address: "0x3f98f690DFec48a03848c045d2D5E7F4838ee70E"
      },
      {
        id: 10,
        address: "0xf6Fd451c9777dB8199D2465eD1A4B774F1075b52"
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
      // return "0x3DdcFc89B4DD2b33d9a8Ca0F60180527E9810D4B";
      // return "0x7d3dE024dEB70741c6Dfa0FaD57775A47C227AE2";
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
