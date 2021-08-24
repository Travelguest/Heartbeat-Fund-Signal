/*
Component: src/component/LineChart/LineChart.tsx
Created with;
$ npx generate-react-cli component LineChart --type=d3
*/

import React, { useState, useEffect, RefObject } from 'react';
import './index.less';
import { Line } from '@ant-design/charts';
import axios from 'axios';

const LineChart = () /* or ( props : ILineChartProps ) */ => {
  const [data, setData] = useState([]);
  const asyncGet = () => {
    axios
      .get('https://gw.alipayobjects.com/os/bmw-prod/e00d52f4-2fa6-47ee-a0d7-105dd95bde20.json')
      .then(({ data }) => {
        console.log(data);
        return setData(data);
      })
      .catch((error) => {
        console.log('fetch data failed', error);
      });
  };
  useEffect(() => {
    asyncGet();
  }, []);

  const config = {
    data,
    xField: 'year',
    yField: 'gdp',
    seriesField: 'name',
    xAxis: { tickCount: 10 },
    yAxis: {
      label: {
        formatter: (v) => `${(v / 10e8).toFixed(1)} B`,
      },
    },
    legend: {
      position: 'top',
    },
    point: {
      shape: ({ name }) => {
        return name === 'China' ? 'square' : 'circle';
      },
      style: ({ year }) => {
        return {
          r: Number(year) % 4 ? 0 : 3, // 4个数据示一个点标记
        };
      },
    },
    slider: {
      start: 0.1,
      end: 0.9,
    },
    annotations: [
      {
        type: 'dataMarker',
        position: ['2008', 4594306848763.08],
        // src: 'data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAoHCBcWFRgWFhYZGRgaGhoaHBocHBoZHB4ZGhoaGhoaHBocIS4lHCErIRgYJjgmKy8xNTU1GiQ7QDs0Py40NTEBDAwMEA8QHxISHzQrJCs0NDQxNDQxNDQxNDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDQ0NDE0NP/AABEIAOEA4QMBIgACEQEDEQH/xAAcAAABBQEBAQAAAAAAAAAAAAAFAAIDBAYHAQj/xABAEAACAQIDBQUGBAMHBAMAAAABAgADEQQhMQUSQVFxBiJhgZETMqGxwfBCUtHhBxRiFRYjU3KC8TOSorIkQ0T/xAAaAQADAQEBAQAAAAAAAAAAAAAAAQIDBAUG/8QAKhEAAwEAAQMDAwMFAQAAAAAAAAECEQMSITEEIkETUXEyYaEUFSOBkQX/2gAMAwEAAhEDEQA/AJwYjPBFPPPRFeKIzwmAhExpaeMY28APS0V41jFeAxXjTHEyjtLaK0U3mOfAczHgm8L140k8jbnMrU7VkCwS5mz7I4o1cMXcDNjl4SnDS1kKk3hQxGKRBdmAEA4ntUgyRS3wEk7bbJZWFRSTTbTjuNxHQzFMtppES1pldUnhp6fa03zTLrDuzdqJWHdOfEcROePbhyk2AxZpurg9ekquJNdhTytPudMvPDIMLX31DcxJjOY6BEzyKNYwGOvKm03tSc+Blm8F9oX3aD+IlT5Jp9jCBog8jiE7DkLDGMGs8WeiICZZYx7ruKFNzxlQHKQuYAeWiivFGB2FdI6RUnkhM4UdwmjSJ6zWmex3aimjFVBa3EaSlLfgmqU+Q6xjTMpU7XflT1MpntVUt7q35yvp0Q+WTbEzy8wj9pax4qPKV323WP4z5WlLiZP1pOgs4GpmG7QYkvUJJuB7oGYg2rjnbV2PnK5MuePpemdcnUe3nVOwCH+WItx1vlOVCdY/hxi0ekyIO8tt64tmb6R8v6Q4n7gxicKGVkcAq2RH1nMe0PZ9qDmwJQkkG1939p17EUyIOxeG3xYjMaX4g6ic8X0s6KlUjiToRkdRGTo+0eyQqtdButx5WP6SVP4eob3c+XQfvN/rSYvhoFdnq10A8IZvL47MJSp9xmJA42ztKG6eU529Zsk0sFGmOMYYhjoB7WPajbmRD0zPbB+6i8zLhe5EW/aZGegR9o5VnUcw1Z7eNM9UQAW/GGS7saovACOKS7gihoHUP5bEC2Sz32dcfhEz/wDeev8A0+n7z3+9da+YX4zmSR1ZQQ2jjqlNG9qoUEECxuSbTAXvC+29sVcRZCoABytxgynganBGPlNolIwttsjiBlr+zqv+W3pG/wBnVf8ALb0l6jPGV6jXN7W8I0y4NnuNUb0ktPAtxQ+kHSQ1DYPCnlEyEagw7Rwp5fCWhgwRY39JH1EX9MywE7N2DwSYbDgMVFR++wBBaxPd6C1py/E7K3WG7cqTab3sVsB0YVnJzBUXucvOTyUnI+OWqNvrpGNh5Mi292PSmb5zlOoqBAM/GSKwtJ8TRyjcJTyJg13DexVxDhcmAkb0URTe1jwi2h3nVfG56CVnxO8W5LoPHmYmNIH18ErZ23SeA8ZBW2QwNlIPXKE0rWck6KAb/wBRjcM7VCDbu6kwTYNIBNg3vu7pPTPSZnths6p3HKHdF851VbLa331lTHqlRWVxkRLimnpFSmsOEFTJPZ2GeXz9JpdubFem3cXI37w5dYLwvZ/EVDZKTkniRYepnWrTRyuGngJcjgPMxKZvMB/D8ABsTVsfyJmfNjNBh9j4WkBuYdCR+J++3XOS+aV4LXDTOTrSYi4UnoCZ57MrqCOs7G+JIFt1QOQUAdJz/tgVFQBQASLm3jFPI6eYFcSmd0zcUdFNsMcQTMY/1hrY3ZfE4o/4NNivF27qD/ccj0FzNdT/AId4egA2NxYU/kSwJ8AWuzeSzmmX5Ox8i8HL2rOrd0Xl7C7aqqbBAT98p0tDs2j/ANDAtVb89W4HX/EPyE8rdqqoFqeHw9MeAuf/ABAEbuV2Y59NzW9UsxabfxP+Rf8A2t+k0OwaeKxIJ9miAcXyv0Gs8xPaLFN+NB4BD+sHVNsYjiyH/aR9ZD5JNf6PmXwaDH7IxSEWRKg/pNj5hrTPbR2u9A7tXDMh4XAseh0jqPaOshz3v9rX/wDFsodwm2kxK+yrBXB/MLMPLj1EapGVcNT+pGVXtNve7hyemfyl2ltGq3/5WA5m01KYVE7lNFXxtL+z8IGJ3swNfE8o3SwlSU9hbHLgPUQKvBeJhjHVlWwGS6aZQkKeQyyHCVcWisCCJi235NJSQyhikVd53AA5mDavbjCI26z+YBI+AgTtIPZIc8iCbf0jMzKYZKZwrVnNMuzWWmb74HA20trNIjqM+S1Pg60u0addN+i6uP6Te3WXEACCcI7PbRejiA9M2H41GjLfMETtzt3VPBgCPOK56WEV1IF+1BdnPRfLUwbRctvW4kn00hjHURYDjKtKgFtwtMmjZNFbEtdAg958j5cYYSgtNALaCVcNSBcN+XX6CebaxB3bDibRpEt72IFxQJN9I13FrkZm1unAWk+C2eSoPGenCBbls5WC3uVKRUnO2XmI+tXJG6rbo8I2qBoo9TrI1qgZG0Qx6YcnPeHwjaqW1+ErPiwDmCBwPLrIn2gDkDmPQykh6NxLZ5+v6zmu28X7WszDTRegmo7T7XKU90WDvcDwXiZiBOjjn5Obmr4FFPbxTY58Oy4vthUfuovsaQyCoQGt4tbLooHWV8LSZzvABCdWsSx8zmfMwHhq5UhgATwuL+ghGpVqEbz7wB4DI5+A0nmzV2z6fk4+D0qxYv5ZPjcMiNd3JJ5n6SlWZfwyvtPFBN0gILHPeO8fSC8TtBnHvEjkq7omq4a053/6XEl21v8A4T4isg1YCUHxVP8AP6yrXEp3QHNd7wuR8pb4JOb+5234SQTIBzDfWS4dc9dNCMiPGDKeMpA+7u9JdouhsQ2XrMLipZ1Lljlns1p0Whjr01Ym5Ci+V8wLE2/SH9nINwHzyvb45zn2zKp3bXDW0zztytNls3aA3Nch9ZW6jg5JcvA5vSKpTBGcpfzfEZjmM/UR9PEF9D+n7ecTRCYE7Udn3qoSjd4KQAdCCDlfhOTYzZ1WllUR0zsARlx0PHQz6CSjcZm8Y+FBFt0EeOcubck1Ko5B2Z2GzWspLNYaaLxvynZGpg01XiAPhINwL4WlDE48DQyKpvyVMZ4JMUliL9YLx+K3BFiMaxN75cpHT2etRt9yT4XgvBTRWTaJGnHWeJikJAd1GehYLf1gjtttUUFFOmArMNeQ59ZkU2MWw5xNRwQzboXeBa/9Q1E1jj6lplXJ0nYRjO73LW8DvfKVKjvrfKch2Xtirh2BpOQL+6TdT5Tp+xtrJiELAbrj305Hn4jxiqXI5pMkeqADvAjzlJ6iDME+uXxhIhTznmLwG8uoFucgsFs6PcX8oH2hXSihd+irxY8PKLELuP3cyOWWkxm2cc1Sq2/e17AH8I6TWJ1kcldK7FTHYtqrl2OZ0HADgBGSO2cknQuxyt6KKKKUI3K19xt45n8Kj9OMI1Nm4qqvtqiulPwNtTbO2kz+y6xdy7e98hyE7T2VqCvgyjZ6qfMZGc3DxdPZnf6z1S5abldv5OVbTwS00FkBJIzPePxg6lh61a4pI7W/KLAeYynUG7NB86o7qn3dC1ss+QhFKCooVFCqNABYR1yYc0cenFcVsHFLm1Cp5KW/9bwVUBFwQQRwIsfQzu+JqKilmICqLknQCc+2t2lp12KJhDiFH4iG3uo3VLLHNt/AVxpfJz6pPKFUqbgw9TwVJ6gVFZHvnQqEje5qlTIhuQa2fGN212fbDkOAXpG2os6X4NbTrNG14ZMzSepj8Jir7jrkQbHwmjwu1GDbulx9mZLD0LZobjW30hjDvoeR+c5KxViPSadx38r+TTYbHHfAuVJ4jTzHETc4ELug5dRp6cJzGjiM73tN32erf4dgxvzt9JeHJTNEALfUGeovjKgreXpJkxY4yXItZX2pSbcbc14TAUcU9yWvcEgq3gbTomJxQItMU+xalV33GsGJF+QOtpNT9jo4aXfqK1HaIqOFsAfDO8O4dLCLZPYyjQsbsSM82JzhR8Oq3vaGYRVJvsYPtzsJ6qrWQFigIZRruniBxtOdMx925yyI4ZT6CRRpoDAG2eymGrMS6br/AJ07pPW2TeYmkcmeTKo6u6OR4DBF3AGl7npOi9m9i1CTUUFRop5gC1z4G0K7M7JUKWYDMNe8fnYC8PivugAHLgLWk3fUxzPSgO+FKZsL9JVxOJBXLIeP7Q9iqg3Tfdz55fvMRicTZmA55fZkmgqFAFy0i21sFK65jdcaOB8+cWHqlTfwhGlXvrNIfYilpz6v2adMiw9JV/seqNBvccp0vE0A4sR5wRVwtWmG3LMDrzt0ms09MahIwf8AJP8AkMU1ftH/AC/CKXrIxA3ZCNvKAM2ICjmb2nY+w1Jqb1EY5e71cC5A6C8wfYbCipjmYju0VuB46L9Zva9XcxeGVcgWYnxLZG/rM5vaRtycSjUu+dgtt3A133vZPu5ZZ2zt4DnMbg9v1aVYUMVbM2VxbU6XIyI8eE6ZilJRgNd0262nz/temQ7cwSPMGXcrwYxTRq/4lV2XDAKffcA9ACbfCF9hbOSjh0RBqoLHizEXJJgXbQOJ2YH1ZVVz1TJvrDPZbGithabXzC7jf6lyMni8YaX5Oa9ttpu+JdCqgU2spAs+XHe1mo2JjBicMrOAxsUcHQkZZ9RY+cr9sOydSriBUpLvCpYMNCGGV+hENdmeyD4dHDuDvkGwGhtbWHLmC49TMBj9mth65RQSj5pxt4eX6S3h8O97FGsf6T6zpa7PRWBZQzDS+YluncHTL4ftOevc9OuORys8o5dhksbGaXZ+LZPdPlNBtTZ1J+8VAbmMjaDf7JIsUO8PjLRi+5bwu0XfVc5P7dzchGM92VT3TYi3WHadFb2jFpk8Tiqg/A1oV2VXG6Of14wrWojS0E4mgEO8PSBe6gw9cHI5H4wbiUJ7rqWU57wytY5DKQiuGz1+9JGqm+8jZ30N7W5WvlJaIQ5T+NGLC9ihFiD4Xzj6tYZnjwuR9c5WaqHzZnRhlcGwPUaHzlHHV91wrm4tqLev/FpBXcKNULC4AHMePWQPjh+LIjnBFUMnfpsD4Xtfw6+ErYjayt76EHjwP7xF4XsfjwRwPSZp2uxPjLTEP7p8jr5Hj8JUYWJFiCDnGPBNVsRaXMPUgoNd4ZwNOaLwQ+5eoKTLYwt+EnwOH42hEIBwjJYI/kYoXigMyv8AC5btim476jy7xml7TkoaNYf/AF1AD0Of0mU/hbW7+KTmVYerD9J0HHYVatNkbRhryOoPrE300Fe5P/ZocLWDorDMEA+onNu1fZVVatWZwKYDOFz3t4jJeWsK7CxeJw7exdC6D3WzIt4MOHgZFt/B18Y4Vu5RFieFz55k/Cbu5zTmUPcKnY2h/wDDUMLhi+R4qSZnWwmK2dVZqKGrh3NyuZt1AzUj82Y5zSvSL1jhkdqdKkiXCHddy17d7UAW4c5d2Vs406hX2ruhFwrsXKm/5jnY+MwVOXpu51FrZWLD01qFbbwvblJ2xgvbnLbUBKWJpKOEiqbelSkV8XUkHt7rlkZWx1W2kG0cSb28YisL1dKjaC/nLOz94EBtZPTvu6SVGtmYEstlMpArlTrPHxNhfnKmJrbuXxjTJwJUsSb6ypjaoL25Sn7bjeNIBzvYyuoMKjVipPL7zibEA8wbjMZGx5dLSxUw+8frFUwy7vjDyMYcWAe/Yg8fHnbiDkYOxJDkgXFtRxAHEcx4cJPVw1152NvI/p+kp4hDkR7y2FxrbgfLT0iaKQsOAnjfzBjq2CVs1FuO7qOoEhVvxAf6gOH9Q5dOHSKtjN3j0On2ZJRXoYcXMpY2qASGzHDmOnMeBllsWDc8ePj49YJx+IBNjn48RGgfY8orY31B0I0P3yml2RS3zbgNZnNmpvNugG3L6ib3ZmE3EA48TNCUXaaWFhHNHqIysptlAeEO9PI3dMUAL2y9l08OgSkgUcTxY82PGNrbYRH3Trxg7aHbDDUwln3y5UWTPdBOrHhblIcXsl2rFhmrEG/hMq6kdHpp46bVP4DGJ7RJSqIjo26wvv8ADPw4wucQjqCrA35H6SmcCj0wjqGFvMHmDwMy23sA1IW1Gqnnb6zSUmsOO/bWrwGtp7GSq4fedHAsKiNutbkeBHWQ4GklBiAzsxzZnYsxP3ynP6iVCLmq4B0AZtJ5sp3pOe9vg89b9ZnTldtOuPS8tJVnZnUDjHY2QXiek594jyjezbBqQbiZcxBiMGumsBOJoJbMH1gr2SBri/rL+Kq5wY+bRhgVw2Ktle/WSPihAm6bixkrNzgLC2790j8p+H2ZWxFfLPhHscieVoLxVfMiA0T/AMzlqfX6SzScmxgNnLG3KEqL2AF4A0EqeIzsZZbvLllAz1O8M4SwlcEQE0Negw08f2+MHgZ5kZ5f8/CH0qAnXylPFpy9LRgmBmRg1wB48QRGYzBgC4GR+7eUnxyOLlbDjoP2gLFYx91l3s7FhkeGvPhf0EakbrCriau5mM+X6ESilB6r2UGxz52vwjsHhXrObkbp11m02RsxUUASkkha2O2LssIBlnzh5FtGU0kwEZQ8T208EeDACPdij4ogOU43ZisjWvcjLrNx2A257egEc/4lIBGB1KjJW+nlM0669cukEDfw1cYii1iPeGdiDqCBqDMYtv20z0fV+lSlcnGvzn2O1KZDtXB+2pMn4rXXrBHZ/tNSxKixCvbNGyN/6eYh9DL7pnl9mjl+K5aEZEcQRBr5TedpezIrHfpsKdTjf3W620PjMdW7PY5Tb2aOOYdR9QfhIrj6u6Z6vB6+ZlTaf5RoOx+17XpMfFfrNRWrZTnmB2F7B/b4uuiEe6it8zx6CFKG31q91G3uWVjaUp6UcHNc3bqewRxmKXS4lNKwOQN+k8obO3271yeQ/WH8FTRBcKAfKIh4gSlJrFrEDmZXfG7psRcQrtDFZEQGhBMYl+5Y/mu4fFvhlBmJNybSwzjOQPENI8w43RfjJUe2cqW5Rb5MWgWKlbj9YT2Zc2+/lAYpG4OdrzTbLpXseHK0fyD7IvlSNLiDcQ5BIhquORFhwMzeKfvnmeWnwlNYSiKu5KkeUyd/8UDWzDwBztp0mnqtkZnmv7WwJGY6Ryx0g7semANLTSUBlAeyVJh1MpYydJMZBTOcnMAPbyQSKSIYAe3insUQHO65F+7ppn4ZSpUWW8Qfd5DL6ys4nJyfqZ9F6V7xLfsUKmCAO+p3SM/D9ob2NtXGBGZGd0XUkb4HE5kShgcE2JrJQXIe87clGs6PtCglHCVEQbqrTYAeVvWdHFT6V1dzw/XKPqtQszz+TLYvtNi1Te3QBwYpkb6WOhg5ztWv+dFPHuILfOGu0ZtgaI57n/qTNRhj3EP9K/ISpvVufJyJa8bOe4fsE7nfxNYnwUlj/wB7fpIe0Gy1wRp16AIQEK63JvfQknnp6Tb7S2xQoj/EqIp5XufQZzFbf7ZUaqPRSm9TfBXPu66EDW8abp/sDSSDezdsIi+2FzTYZ815kjw4yettlHG8jhhzBvMX2Tp103lemwpML97KzcwDnYytjsM2FqGpSzose+n5enhyMySXU5b/AAV1PNw1NbaF9WHrKTbVQXAYE6SpTKOodcwfux5TPbTTcqsLWDC4+vxlKd7F74NbTxYOkl9rlMVh8e6WF7j74wxhMeW4fWJy0PqW4G1IMtpR0t5wdhqt87QlhntwiEEFwm9b/iGMFSsBygenibXG6Tf71hLAVTaCJrcLuIZbTL41xv8Ad4/flNBicQN08/vKAfY3J53vfgPDxlUwlFF24/fwgt1Jq38JpDgGfQGL+xd07za28o5KbHbHSwhWpKeFTd4WHLj5y0xvGBNhnvLUqYfLOWlaNAOSSASNZIxsIwFeKQe1igBgMTlIXMbiKmcTnunpOW/1Huekr/F+DT/w8wlkqVyM6jlR/pXL53hXtlX3cK44uVQeZEj7HELg6WeoJ8yxMFdtcYWqYWkv4qoY9Ft+pm25/o8K222/uN7bErQw6AEm+gFzkltB1ghk2hiFCs5pIABmdzIZaDM+cJdqu0b0GVEQM5F89FHDzMyOIqYqv/1KhAP4VyHSw1j9Nxc3JPtSz7nNy8kQ+7L77HwlEXr1jUYXJVcvkST6ys/aNEBGGw6r4kZ+g19ZZ2d2QqtY7hA13n7o9NYW/u3Sp953Hiqiw9dZ0/00Q/8ALW/siFy1S9iz8mJxWOxVX3nKjkO78BL2xcViE7lRC9M5He1A8CdR4Q/i6lOkO5TF+drn1ME1a7uwyyMXK+FrJQ+OeXdplSrQVHLUGdFOqggjyB0lKpuXuzbx4/ib9oQfCNfvAm+g5eMtU9jrkd0dJkrRt0sztR2bJEsOZzM0uyMLddy2uvjCeG2WnG3S0M4LBomgziq0+w1LQLobKYMMz0zt6wrh9nvoBqdf0EJLaWFrACZ9jTuQUcCVNzmfDQS17HK0ej6RM8NFhG+HU6+fSepQXQCPppfMycm2cAw9CBBIqi3j2biZE5J/SPQSKLqBp5n9JG1S3iZPVQ/eko4hd2w4nhxiTwotUKssUnztA9J7GwGfyl9Kg55y09DAnTaeVG3shpxlVat8hLCGUB7uRR14ogOV4x9058J7Sq74y0hHaGB375QZs/D7lwxyvMqjqXY7eH1C43j8M1nZLFIlF1quFWm5C3P4W71hzzJk+GVa+M9vYinTQLTuCN5jfeYA8IBo1kQ3sL8/+ZbTGu3unL75S3KzGcFvafT4Co2DQNZ6+JrFixuEXIADQX10l59uYWiN3D0VB/MRn/3HOZ5qN8wTfjn9Yhs4WvY/fjLXLUz0z4M/oy31PyXMVtWtU/EFB5SClhSQQzX45y7g8Bdd06jMGXEwtj85m6bNFKQNo7ODZESu2yApLW8fTSajCYW1+vzjnogtbgIkxsyJwRGuZ+OeceUtkZpKuHFr87wZisNmoiY0U6CgSZXzEm/lbEC378/KQhe8RJZaxlnDvn5R6m7CMoi2Q1k7IbiIC7SzvJwkhpNaTqbSkyWLetImr59JHWeDnr59YOgU6X3rSZHsPE/KDDVzj/5jSHUHSW6lSwy1gooWZj8foJad7z0VAIboZhWakB+n1MhFQ35fpLarfMzw0LaxpiJcM4lxagAg+lT4200/WRVa9jzPwmiYBj2o8YoH/nDzij0MKDrzgvH07+6Av9RF4bemTpIXw/POIGtAGGwpvm6t5Ef8Q7hNnC1xGpglve2cvYU20H31ktgkOTCnlL1DDZWklE3l+kkQEGHw9rS21ASVEkhSBOkSpYSJKeZMtuMoxEgBSxa5ZcJAlDMnlLmI5RFLJ1iGU0o3ueP0lLEoBoLfUwmzgLyEokbxuRYDQcTAZHRTO3wlxx8MpXRwCTHipvRbg0h9JeMcz5xm/lYRgaSMhxDa+kpMls5eqjQSColxEWmU965jwpJHISSjQzlhcPwHH5cYJA6SIqALHw18hHKu8fCXFphVIEamQ6ysIb0ZTSw+Z+k8Zrnwid79IlWNEkhF8hpKOMUKPmfoJdrVN0WAz4CUzQv3n7zcByloAZ/MjkZ5CPs25RR6PR4kVSexR/AkJtIqUUUzY14CmE0EJ09IooCZZSOM9ijIGHSNWKKIaKtX3pNitIooIYOxvuiQtxiigMr1Pc846joJ5FIZS8D5IIooAM4xp0WKKAxJx8pYpT2KNEs8fWQNoZ7FGIiTT75yalp5xRQQM8re8ekr/jH+kxRS0IUUUUAP/9k=',
        text: {
          content: '2月份因逢春节水产销售需求旺盛\uFF0C\n需求大增',
          style: { textAlign: 'left' },
        },
        point: {
          style: {
            fill: '#f5222d',
            stroke: '#f5222d',
          },
        },
        // offsetY: -250,
      },
    ],
    // animation: {
    //   appear: {
    //     animation: 'path-in',
    //     duration: 5000,
    //   },
    // },
  };
  return <Line {...config} />;
};

/*
interface ILineChartProps {
  // TODO
}
*/

export default LineChart;
