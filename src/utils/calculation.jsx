// const handleClick = (id) => {
//   setCounter((prevCounter) =>
//     prevCounter.map((item) =>
//       item.id === id ? { ...item, select: true } : { ...item, select: false },
//     ),
//   );
// };

// const selectedItem = counter.find((item) => item.id === selectedId);

// console.log("selected item = ", selectedItem);

// const calculation = useCallback(
//   (operation, id) => {
//     setCounter((prevCounter) => {
//       if (operation === "new/counter") {
//         return [
//           ...prevCounter,
//           {
//             id: new Date(),
//             count: 0,
//             value: 1,
//             list: [],
//             action: 0,
//             minCount: 0,
//             maxCount: 0,
//           },
//         ];
//       }

//       if (operation === "reset/count") {
//         return prevCounter?.map((counterItem) =>
//           counterItem.id === id
//             ? {
//                 ...counterItem,
//                 count: 0,
//                 value: 1,
//               }
//             : counterItem,
//         );
//       }

//       if (operation === "reset/history") {
//         return prevCounter.map((item) =>
//           item.id === id ? { ...item, list: [] } : item,
//         );
//       }

//       const targetItem = prevCounter.find((item) => item.id === id);
//       if (!targetItem) {
//         console.log(`item with id:${id} dont exist`);
//         return prevCounter;
//       }

//       const baseValue =
//         targetItem.value === 0 || targetItem.value === ""
//           ? 1
//           : targetItem.value;

//       const newValue =
//         operation === "increment"
//           ? targetItem.count + baseValue
//           : targetItem.count - baseValue;

//       if (newValue > maxCountValue) {
//         alert(
//           `you can't go beyond the maximum value limit of ${maxCountValue}`,
//         );
//         return prevCounter;
//       }

//       if (newValue < minCountValue) {
//         alert(
//           `you can't go beyond the minimum value limit of ${minCountValue}`,
//         );
//         return prevCounter;
//       }

//       console.log("printing the count", newValue);

//       const newCounter = prevCounter.map((item) =>
//         item.id === id
//           ? {
//               ...item,
//               value: baseValue,
//               count: newValue,
//               list: [...item.list, { value: newValue, timeStamp: getTime() }],
//               action: item.action + 1,
//             }
//           : item,
//       );

//       const itemToBeUpdated = newCounter.find((c) => c.id === id);
//       if (!itemToBeUpdated.list || itemToBeUpdated.list.length === 0) {
//         return newCounter;
//       }

//       const listValues = itemToBeUpdated?.list.map((a) => a.value);
//       const maxCount = listValues.length > 0 ? Math.max(...listValues) : null;
//       const minCount = listValues.length > 0 ? Math.min(...listValues) : null;

//       const finalResult = newCounter.map((a) =>
//         a.id === id ? { ...a, maxCount, minCount } : a,
//       );

//       return finalResult;
//     });
//   },
//   [minCountValue],
// );
