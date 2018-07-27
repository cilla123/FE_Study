pragma solidity ^0.4.4;

/**
 * 一个集资合约的案例，里面有两个角色，一个是投资人Funder，也就是出资者。另一个角色是运动员Campaign，被赞助者。一个Funder可以给多个Campaign赞助，一个Campaign也可以被多个Funder赞助。
 */
contract CrowdFunding {

    // 0xca35b7d915458ef540ade6068dfe2f44e8fa733c
    // 0x14723a09acff6d2a60dcdf7aa4aff308fddc160c
    // 0x4b0897b0513fdc7c541b6d9d7e929c4e5364d2db

    // 定义一个`Funder`结构体类型，用于表示出资人，其中又出资人的钱包和他一共出资的总额度
    struct Funder {
        // 出资人地址
        address addr;
        // 出资总额
        uint amount;
    }

    // 定义一个表示存储运动员相关信息的结构体
    struct Campaign {
        // 受益人钱包地址
        address beneficiary; 
        // 需要赞助的总额度
        uint fundingGoal;
        // 有多少人赞助
        uint numFunders;
        // 已赞助的总金额
        uint amount;
        // 按照索引存储出资人信息
        mapping(uint => Funder) funders;
    }

    // 统计运动员(被赞助人)数量
    uint public numCampaigns;
    // 以键值对的形式存储被赞助人的信息
    mapping (uint => Campaign) public campaigns;

    /**
     * 新增一个`Campaign`对象，需要传入受益人的地址和需要筹资的总额
     */
    function newCampaign(address beneficiary, uint goal) public returns (uint campaignID) {
        // 计数+1
        campaignID = numCampaigns++;
        // 创建一个`Campaign`对象，并存储到`campaigns`里面
        campaigns[campaignID] = Campaign({
            beneficiary: beneficiary,
            fundingGoal: goal,
            numFunders: 0,
            amount: 0
        });
    }

    /**
     * 通过campaignID给某个Campaign对象赞助
     */
    function contribute(uint campaignID) public payable {
        // 通过campaignID获取campaignID对应的Campaign对象
        Campaign storage c = campaigns[campaignID];
        // 存储投资者信息
        c.funders[c.numFunders++] = Funder({
            addr: msg.sender,
            amount: msg.value
        });
        c.amount += msg.value;
        c.beneficiary.transfer(msg.value);
    }

    /**
     * 检查某个campaignID编号的受益人集资是否达标，不达标返回false，否则返回true
     */
    function checkGoalReached(uint campaignID) public view returns (bool reached) {
        Campaign storage c = campaigns[campaignID];
        if(c.amount < c.fundingGoal){
            return false;
        }
        return true;
    }

}