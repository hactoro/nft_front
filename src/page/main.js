import { useState, useEffect } from 'react';
import Web3 from 'web3';
import {MINT_CONTRACT_ABI, MINT_CONTRACT_ADDRESS, SALE_CONTRACT_ABI, SALE_CONTRACT_ADDRESS, TEST_TOKEN_ABI, TEST_TOKEN_ADDRESS} from '../contracts/config'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import { CardActionArea } from '@mui/material';
import useEffect2 from '../utils/useEffect2'


export default function Main(){

    const [account, setAccount] = useState();
    const [mintContract, setMintContract] = useState();
    const [saleContract, setSaleContract] = useState();
    const [sales, setSales] = useState([]);


    useEffect(()=>{

        async function getNftsOnSale(){
            const web3 = new Web3(Web3.givenProvider);
            const accounts = await web3.eth.requestAccounts();
            setAccount(accounts[0]);

            const InstSaleContract = new web3.eth.Contract(SALE_CONTRACT_ABI, SALE_CONTRACT_ADDRESS);
            setSaleContract(InstSaleContract);


            // console.log(await saleContract.methods.getNftsOnSale().call());
        }
        // async function load(){
        //     const web3 = new Web3(Web3.givenProvider);
        //     const accounts = await web3.eth.requestAccounts();  
        //     setAccount(accounts[0]);

        //     // const mintContractInst = new web3.eth.Contract(MINT_CONTRACT_ABI, MINT_CONTRACT_ADDRESS);
        //     // const saleContractInst = new web3.eth.Contract(SALE_CONTRACT_ABI, SALE_CONTRACT_ADDRESS);
        //     // setMintContract(mintContractInst);
        //     // setSaleContract(saleContractInst);


        //     const testContract = new web3.eth.Contract(TEST_TOKEN_ABI, TEST_TOKEN_ADDRESS)
        //     let ret = await testContract.methods.setMyNumber(1000).send({
        //         from: accounts[0]
                
        //     });

        //     console.log(ret);


        //     // testContract.methods.setMyNumber(100).estimateGas({
        //     //     from: accounts[0]
        //     // }).then(function(gasAmount){
        //     //     console.log(`estimate gas : ${gasAmount}`);

        //         // testContract.methods.setMyNumber(999).send({from: accounts[0],
        //         //     gasPrice: gasAmount}).then(function(error, hash){
        //         //     console.log(error);
        //         // })
        //     // })

        //     console.log(testContract)

            

        //     let aaa = await testContract.methods.getMyname().call();

        //     console.log(aaa);

        //     // mintContractInst.methods.mintAnimalToken().call()
        //     // .then(console.log("hello"));



        //     // console.log(saleContractInst.methods);
          


        // }

        getNftsOnSale();

    }, [])

    useEffect(()=>{

        async function getListOnSale(){
            let ret = await saleContract.methods.getNftsOnSale().call();
            setSales(
                ret.map((item)=>{
                    let imgUrl;
                    try{
                        imgUrl = require(`static/images/nft/${item}.jpeg`);
                    }catch(e){

                    }
                    return imgUrl;
                })
            )
        }

        getListOnSale();

    },[saleContract])

    useEffect(()=>{
        console.log(sales);
    }, [sales])

    useEffect(()=>{
        console.log(account);
    }, [account])

    return(
        <Grid container rowSpacing={1} columnSpacing={{xs:1, sm: 2, md: 3}}>
            {sales.map((item)=>{
                return(
                   

                        <Grid item xs={6} >
                            <Card sx={{ maxWidth: 345 }}>
                                <CardActionArea>
                                    <CardMedia
                                    component="img"
                                    height="200"
                                    image={item}
                                    alt="green iguana"
                                    />
                                    <CardContent>
                                    <Typography gutterBottom variant="h5" component="div">
                                        오늘 그녀를 다시 볼 수 있을까?
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        이 부적을 당신의 지갑에 보관하세요. 그럼 만남의 기운이 올라갈 거예요.
                                    </Typography>
                                    </CardContent>
                                </CardActionArea>
                            </Card>
                        </Grid>
                
                )
            })}
        </Grid>

    )
}

