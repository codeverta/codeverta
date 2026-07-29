---
title: "Codeverta và Số hóa Y tế Indonesia: Từ Hồ sơ Bệnh án Điện tử đến Tích hợp SATUSEHAT"
date: "2026-07-29"
image: "/assets/healthcare/editorial/codeverta-healthcare-digitalization-hero.png"
desc: "Câu chuyện về cách Codeverta giúp các cơ sở y tế xây dựng hệ thống vận hành, hồ sơ bệnh án điện tử và lộ trình tích hợp SATUSEHAT sẵn sàng sử dụng trong công việc hàng ngày."
tags: "Codeverta y tế, số hóa y tế Indonesia, tích hợp SATUSEHAT, hồ sơ bệnh án điện tử, RME, hệ thống thông tin bệnh viện, hệ thống quản lý phòng khám, FHIR Indonesia, phần mềm y tế"
translationOf: "26-codeverta-membantu-digitalisasi-healthcare-indonesia-integrasi-satusehat"
---

# Codeverta và Số hóa Y tế Indonesia: Từ Hồ sơ Bệnh án Điện tử đến Tích hợp SATUSEHAT

Số hóa y tế thường được bàn luận như thể công việc kết thúc khi một phòng khám ngừng sử dụng giấy tờ. Thực tế không hề đơn giản như vậy.

Chuyển đổi biểu mẫu thành màn hình là một phần của quy trình. Tuy nhiên, công việc khó khăn hơn lại xuất hiện sau đó: đảm bảo dữ liệu bệnh nhân không trùng lặp, quy trình làm việc của bác sĩ và y tá vẫn thuận tiện, tồn kho thuốc được kết nối với đơn thuốc, kết quả xét nghiệm được nhập vào lịch sử chính xác và dữ liệu bắt buộc có thể được gửi đến hệ sinh thái quốc gia.

Đó là lúc Codeverta đảm nhận vai trò của mình. Chúng tôi giúp xây dựng lớp công nghệ được các cơ sở y tế sử dụng hàng ngày, từ hệ thống quản lý phòng khám và bệnh viện, hồ sơ bệnh án điện tử, nhà thuốc, phòng xét nghiệm, lịch trình nhân viên y tế cho đến chuẩn bị tích hợp với SATUSEHAT.

Vai trò này khá rõ ràng. Bộ Y tế xây dựng SATUSEHAT như một nền tảng trao đổi dữ liệu y tế quốc gia. Codeverta hoạt động ở phía cơ sở và hệ thống vận hành: làm cho dữ liệu phát sinh từ các dịch vụ hàng ngày trở nên gọn gàng, có cấu trúc, an toàn và sẵn sàng để trao đổi theo quy định của Bộ Y tế.

![Nhân viên y tế sử dụng hệ thống kỹ thuật số trong quy trình khám bệnh tại Indonesia](/assets/healthcare/editorial/digital-clinic-indonesia.png)

_Minh họa bài viết: công nghệ nên theo dòng chảy dịch vụ, không nên làm cho nhân viên y tế bận rộn với việc phục vụ ứng dụng._

## Vấn đề Không Chỉ Là "Chưa Có Ứng Dụng"

Tại nhiều cơ sở y tế, thực tế đã có ứng dụng. Đăng ký dùng một hệ thống, khoa khám dùng hệ thống khác, phòng xét nghiệm có ghi chép riêng, trong khi nhà thuốc và quầy thu tiền vẫn dựa vào bảng tính. Mỗi bộ phận có thể hoạt động, nhưng dữ liệu không phải lúc nào cũng nói cùng một ngôn ngữ.

Hậu quả thật dễ đoán:

- bệnh nhân phải nhập lại dữ liệu đã cung cấp;
- nhân viên sao chép thông tin từ màn hình này sang màn hình khác;
- bác sĩ chậm xem được kết quả xét nghiệm;
- tồn kho thuốc trong hệ thống khác với tình trạng trên kệ;
- báo cáo quản lý chỉ hoàn thành sau nhiều lần đối chiếu;
- đội ngũ IT gặp khó khăn khi chuẩn bị dữ liệu cho nhu cầu khả năng tương tác.

Chúng tôi không bắt đầu dự án y tế bằng câu hỏi "cần tạo tính năng gì?" Câu hỏi đầu tiên thường đơn giản hơn: từ khi bệnh nhân đến cho đến khi ra về, ai làm gì, dữ liệu nào thay đổi, và ở điểm nào quy trình thường bị tắc nghẽn nhất?

Câu trả lời cho câu hỏi đó trở thành nền tảng của hệ thống.

![Giao diện hệ thống quản lý phòng khám Codeverta](/assets/healthcare/manajemen-klinik.png)

_Ví dụ về giao diện hệ thống quản lý phòng khám để thống nhất công việc hành chính và dịch vụ._

## Xây dựng Nền tảng: Một Quy trình, Một Lịch sử Bệnh nhân

Một hệ thống y tế tốt không nên giống như một bộ sưu tập các menu. Nó phải đi theo hành trình của bệnh nhân.

Khi bệnh nhân đăng ký, hệ thống tạo hoặc tìm ra danh tính chính xác. Khi bệnh nhân vào khoa khám, bác sĩ nhìn thấy lịch sử liên quan. Khi bác sĩ tạo đơn thuốc hoặc yêu cầu xét nghiệm, nhà thuốc và phòng xét nghiệm nhận dữ liệu mà không cần gõ lại. Sau khi dịch vụ kết thúc, thông tin lâm sàng và giao dịch vẫn được kết nối với cùng một lượt khám.

Nguyên tắc đó chúng tôi áp dụng ở nhiều lớp.

### Đăng ký và nhận dạng bệnh nhân

Tìm kiếm dữ liệu phải nhanh, nhưng không được cẩu thả. Hệ thống cần giúp nhân viên nhận biết khả năng dữ liệu trùng lặp, lưu trữ danh tính một cách nhất quán, đồng thời duy trì mối quan hệ giữa bệnh nhân, lượt khám, người bảo lãnh và cơ sở.

![Chi tiết dữ liệu bệnh nhân trong hệ thống y tế](/assets/healthcare/patient-detail.png)

_Dữ liệu nhân khẩu học, thông tin liên lạc và bối cảnh dịch vụ được lưu trữ trong hồ sơ có cấu trúc._

### Hồ sơ bệnh án điện tử được sử dụng thực sự

RME không phải là tập tin PDF được chuyển vào máy tính. Bên trong nó có các ghi chép khám bệnh, chẩn đoán, dị ứng, hành động, quan sát lâm sàng, đơn thuốc, kết quả cận lâm sàng, cũng như dấu vết thay đổi dữ liệu.

Thách thức lớn nhất không phải là thêm nhiều cột nhất có thể. Thách thức là làm cho bác sĩ có thể ghi chép đầy đủ mà không kéo dài thời gian tư vấn. Vì vậy, cấu trúc form, thứ tự thông tin, quyền truy cập và mẫu lâm sàng cần được xây dựng cùng với người dùng.

![Hồ sơ bệnh án điện tử trên nền tảng y tế Codeverta](/assets/healthcare/rekam-medis-elektronik.png)

_RME là trung tâm của bối cảnh dịch vụ, không chỉ đơn thuần thay thế tập tài liệu giấy._

![Lịch sử khám bệnh của bệnh nhân trong một giao diện](/assets/healthcare/patient-history.png)

_Lịch sử được kết nối giúp nhân viên y tế hiểu những gì đã xảy ra trong các lần khám trước._

### Quy trình làm việc của bác sĩ và phối hợp giữa các đơn vị

Bác sĩ cần một bản tóm tắt ngắn gọn: bệnh nhân hôm nay, trạng thái hàng đợi, kết quả xét nghiệm chưa xem, và các hành động cần tiếp tục. Đội ngũ vận hành cần một góc nhìn khác. Hệ thống cần cung cấp cả hai mà không tạo bản sao dữ liệu mới.

![Bảng điều khiển bác sĩ trong hệ thống y tế Codeverta](/assets/healthcare/doctor-dashboard.png)

_Bảng điều khiển bác sĩ đặt các công việc cần xử lý tiếp trong một không gian làm việc._

![Lịch trình bệnh nhân và nhân viên y tế](/assets/healthcare/patient-schedule.png)

_Lịch trình được kết nối giúp giảm xung đột lịch và hàng đợi không cần thiết._

## Tích hợp SATUSEHAT Bắt đầu Từ Rất Lâu Trước Khi Gọi API

SATUSEHAT là nền tảng chính thức của Bộ Y tế để kết nối các hệ thống thông tin y tế thông qua chuẩn hóa và tích hợp RME. Trao đổi dữ liệu của nó sử dụng tiêu chuẩn toàn cầu HL7 FHIR. Bộ Y tế cũng phân biệt giữa luồng cơ sở sử dụng RME từ đối tác/nhà cung cấp và cơ sở phát triển RME độc lập.

Về mặt kỹ thuật, tài liệu API chắc chắn quan trọng. Nhưng tích hợp không bắt đầu từ endpoint. Tích hợp bắt đầu từ chất lượng dữ liệu bên trong cơ sở.

Trước khi một lượt khám có thể được gửi đi, hệ thống phải biết bệnh nhân chính xác, nhân viên y tế cung cấp dịch vụ, tổ chức và địa điểm dịch vụ, thời gian encounter, chẩn đoán, quan sát, cho đến thuốc được kê đơn. Nếu dữ liệu nguồn không nhất quán, kết nối API thành công cũng chưa tạo ra khả năng tương tác tốt.

![Minh họa khả năng tương tác dữ liệu y tế quốc gia](/assets/healthcare/editorial/satusehat-interoperability-indonesia.png)

_Minh họa bài viết: phòng khám, bệnh viện, phòng xét nghiệm và nhà thuốc trao đổi dữ liệu qua lớp khả năng tương tác an toàn._

Trong công việc tích hợp, Codeverta giúp chuyển đổi các sự kiện thực tế thành cấu trúc dữ liệu có thể trao đổi. Ví dụ:

- danh tính bệnh nhân được ánh xạ tới resource `Patient`;
- nhân viên y tế và cơ sở được ánh xạ qua `Practitioner`, `Organization`, và `Location`;
- đăng ký và hành trình lượt khám được ghi lại dưới dạng `Encounter`;
- chẩn đoán và khiếu nại lâm sàng có thể sử dụng `Condition`;
- kết quả xét nghiệm và dấu hiệu sinh tồn được gửi dưới dạng `Observation`;
- đơn thuốc và xuất thuốc sử dụng các resource như `MedicationRequest` và `MedicationDispense`.

Đối với khám ngoại trú, tài liệu SATUSEHAT cũng quy định việc sử dụng IHS Number của bệnh nhân từ Master Patient Index của Bộ Y tế. Trong khi đó, đối với dịch vụ dược phẩm, luồng bao gồm dữ liệu đơn thuốc, xuất thuốc và cập nhật lượt khám. Nghĩa là, tích hợp không phải là một nút "gửi tất cả", mà là một chuỗi các giao dịch tuân theo bối cảnh dịch vụ.

Tài liệu tham khảo kỹ thuật luôn tuân theo tài liệu chính thức, bao gồm [playbook khám ngoại trú SATUSEHAT](https://satusehat.kemkes.go.id/platform/docs/id/interoperability/rme-rawat-jalan/), [playbook dịch vụ dược phẩm](https://satusehat.kemkes.go.id/platform/docs/id/interoperability/kefarmasian/) và [hướng dẫn đăng ký cơ sở](https://satusehat.kemkes.go.id/platform/docs/id/registration-guide/regis-institution/).

Lưu ý quan trọng: Codeverta không phải là chủ sở hữu hoặc quản lý SATUSEHAT. Nền tảng đó được quản lý bởi Bộ Y tế. Chúng tôi giúp các cơ sở y tế và người quản lý hệ thống RME chuẩn bị ứng dụng, dữ liệu, quy trình tích hợp, kiểm thử cũng như giám sát cần thiết để kết nối với hệ sinh thái đó.

## Không Chỉ RME: Vận hành Bệnh viện Cũng Phải Được Kết nối

Dịch vụ y tế không dừng lại ở bàn bác sĩ. Có phòng xét nghiệm, nhà thuốc, tồn kho, bảo trì thiết bị, lịch trình phòng, tài chính, cũng như các công việc hành chính quan trọng không kém.

### Phòng xét nghiệm

Yêu cầu xét nghiệm cần đến đúng đơn vị, sử dụng cùng danh tính bệnh nhân và lượt khám. Sau khi kết quả được xác thực, bác sĩ phải có thể xem mà không cần chờ hồ sơ giấy hoặc tin nhắn riêng.

![Mô-đun xét nghiệm trong hệ thống y tế](/assets/healthcare/lab-test-investigation.png)

_Yêu cầu và kết quả xét nghiệm vẫn kết nối với lượt khám của bệnh nhân._

### Đơn thuốc, nhà thuốc và tồn kho

Đơn thuốc kỹ thuật số không chỉ là danh sách thuốc. Hệ thống cần xử lý liều lượng, hướng dẫn sử dụng, trạng thái cấp phát, tồn kho, lô, cho đến ngày hết hạn. Dữ liệu lâm sàng và dữ liệu tồn kho có nhu cầu khác nhau, nhưng cả hai gặp nhau trong cùng một quy trình.

![Yêu cầu thuốc điện tử](/assets/healthcare/medication-request.png)

_Medication request giữ cho luồng đơn thuốc có thể truy xuất từ bác sĩ đến nhà thuốc._

![Điểm bán hàng nhà thuốc tích hợp](/assets/healthcare/point-of-sales-pharamcy.png)

_Giao dịch nhà thuốc kết nối với tồn kho để tránh ghi nhận chuyển động thuốc hai lần._

![Phân tích tuổi tồn kho thuốc và vật tư y tế](/assets/healthcare/stock-ageing.png)

_Stock ageing giúp đội ngũ xem các mặt hàng lưu kho lâu hoặc sắp hết hạn sử dụng._

### Tài sản và bảo trì

Thiết bị y tế không chỉ đủ được đăng ký là tài sản. Có lịch hiệu chuẩn, bảo trì, hư hỏng, người chịu trách nhiệm và các ghi chép hành động cần được lưu lại.

![Danh sách nhiệm vụ bảo trì tài sản cơ sở y tế](/assets/healthcare/maintenance-tasks.png)

_Đội ngũ cơ sở vật chất có thể xem các công việc bảo trì đang mở và ưu tiên xử lý tiếp._

![Lịch sử bảo trì tài sản y tế](/assets/healthcare/asset-maintenance-log.png)

_Nhật ký bảo trì giúp kiểm tra tình trạng tài sản dễ dàng hơn và không phụ thuộc vào trí nhớ của một người._

### Cấu trúc dịch vụ và góc nhìn quản lý

Cơ sở có nhiều khoa, phòng hoặc chi nhánh cần cấu trúc đơn vị rõ ràng. Từ cấu trúc đó, quyền truy cập, lịch trình, phân bổ chi phí và báo cáo có thể tuân theo tổ chức thực tế.

![Cấu trúc đơn vị dịch vụ cơ sở y tế](/assets/healthcare/service-unit-tree.png)

_Cấu trúc đơn vị giúp hệ thống tuân theo tổ chức cơ sở, không phải ngược lại._

![Phân tích lợi nhuận dịch vụ y tế](/assets/healthcare/profitability-analysis.png)

_Quản lý có thể xem khía cạnh vận hành và tài chính mà không cần mở bảng tính từ nhiều đơn vị._

## Hạ tầng Không Thấy được Nhưng Quyết định

Người dùng nhìn thấy form, bảng và dashboard. Đằng sau đó có công việc không kém phần quan trọng:

- kiểm soát truy cập dựa trên vai trò cho bác sĩ, y tá, nhà thuốc, nhân viên thu ngân và quản trị viên;
- audit trail để các thay đổi dữ liệu quan trọng có thể được truy xuất;
- xác thực dữ liệu trước khi vào hàng đợi tích hợp;
- cơ chế retry khi dịch vụ bên ngoài không khả dụng;
- ghi nhận phản hồi API để hỗ trợ điều tra lỗi;
- tách biệt môi trường phát triển, sandbox và production;
- sao lưu, giám sát và quy trình khôi phục dịch vụ;
- bảo vệ dữ liệu cá nhân theo bối cảnh và thẩm quyền của người dùng.

Đặc biệt đối với tích hợp SATUSEHAT, trạng thái HTTP 200 hoặc 201 không phải là thước đo thành công duy nhất. Đội ngũ cũng cần biết resource nào đã được gửi, resource nào bị từ chối, tại sao bị từ chối và liệu việc sửa chữa có an toàn mà không tạo dữ liệu trùng lặp hay không.

Bộ Y tế cung cấp bảng điều khiển giám sát để xem dữ liệu RME đã gửi thành công. Ở phía ứng dụng, chúng tôi bổ sung nhu cầu đó bằng việc ghi nhận và công cụ giám sát vận hành để đội ngũ cơ sở không phải phỏng đoán khi có sự cố.

![Danh sách vấn đề vận hành trên nền tảng y tế](/assets/healthcare/issues.png)

_Các vấn đề và hành động tiếp theo cần được ghi nhận như các phần khác của vận hành, không bị mất trong các cuộc trò chuyện riêng tư._

## Cách Chúng tôi Thực hiện Triển khai

Mỗi cơ sở có thói quen, quy mô và mức độ sẵn sàng khác nhau. Vì vậy, việc triển khai không được chúng tôi xử lý như cài đặt ứng dụng rồi giao tài khoản.

Thông thường, công việc diễn ra qua nhiều giai đoạn.

**Đầu tiên, lập bản đồ quy trình thực tế.** Chúng tôi theo dõi hành trình dữ liệu từ đăng ký, dịch vụ, cận lâm sàng, nhà thuốc, thanh toán cho đến báo cáo. Các quy trình chỉ có trong SOP nhưng không diễn ra thực tế cần được phân biệt ngay từ đầu.

**Thứ hai, làm sạch dữ liệu chính.** Danh tính bệnh nhân, nhân viên y tế, địa điểm, đơn vị, dịch vụ, thuốc và thuật ngữ lâm sàng được kiểm tra trước khi di chuyển hoặc tích hợp. Đây là công việc thầm lặng, nhưng tác động lớn.

**Thứ ba, xây dựng mô-đun theo giai đoạn.** Đội ngũ cơ sở có thể thử quy trình cốt lõi trước. Góp ý từ bác sĩ, y tá, nhân viên đăng ký và nhà thuốc được sử dụng để cải thiện cách hệ thống hoạt động.

**Thứ tư, chuẩn bị khả năng tương tác.** Ánh xạ FHIR, xác thực, kiểm thử trên sandbox, xử lý lỗi và giám sát được sắp xếp theo các playbook SATUSEHAT liên quan.

**Thứ năm, hỗ trợ go-live.** Trong những tuần đầu, các vấn đề nhỏ cần được xử lý nhanh. Đôi khi không phải lỗi, mà là thuật ngữ gây nhầm lẫn hoặc thứ tự nút không phù hợp với nhịp dịch vụ.

Cách tiếp cận này thực sự đòi hỏi lắng nghe nhiều hơn. Đối với y tế, đó là điều bắt buộc.

## Thước đo Thành công Mà Chúng tôi Tìm kiếm

Chúng tôi thận trọng với những lời hứa như "tất cả quy trình nhanh hơn 10 lần". Cơ sở y tế quá phức tạp để tóm gọn thành một con số.

Thước đo hợp lý hơn là những điều có thể cảm nhận và kiểm tra:

- nhân viên không còn phải gõ danh tính bệnh nhân nhiều lần;
- bác sĩ có thể tìm thấy lịch sử quan trọng mà không cần mở nhiều ứng dụng;
- kết quả xét nghiệm và đơn thuốc được kết nối với lượt khám đúng;
- đội ngũ nhà thuốc có dấu vết luân chuyển tồn kho;
- quản lý nhận được báo cáo từ cùng một nguồn dữ liệu;
- đội ngũ tích hợp có thể xem trạng thái gửi và sửa lỗi;
- cơ sở có nền tảng sẵn sàng hơn để tuân theo tiêu chuẩn của Bộ Y tế.

Số hóa tốt thường trở nên bình thường sau khi sử dụng. Hàng đợi di chuyển, dữ liệu được tìm thấy, đơn thuốc đến, kết quả xét nghiệm xuất hiện và báo cáo được hình thành. Không có chương trình công nghệ. Hệ thống chỉ cần hoạt động.

## Xây dựng Y tế Kỹ thuật số Indonesia, Một Hệ thống Có Thể Sử dụng

Chuyển đổi y tế quốc gia cần các nền tảng lớn như SATUSEHAT. Tuy nhiên, nền tảng quốc gia vẫn cần hàng nghìn hệ thống tại bệnh viện, phòng khám, phòng xét nghiệm, nhà thuốc và các cơ sở khác có khả năng tạo dữ liệu chất lượng.

Trong không gian đó, Codeverta hoạt động.

Chúng tôi giúp các cơ sở y tế xây dựng hệ thống vận hành gần gũi với nhu cầu người dùng, đồng thời chuẩn bị cấu trúc dữ liệu và hạ tầng tích hợp theo định hướng của Bộ Y tế. Mục tiêu không chỉ là vượt qua kết nối API. Mục tiêu là làm cho dữ liệu di chuyển đúng cách mà không ảnh hưởng đến dịch vụ chăm sóc bệnh nhân.

Nếu cơ sở của bạn đang chuẩn bị RME, cải thiện hệ thống lâm sàng hoặc bệnh viện, kết nối nhà thuốc và phòng xét nghiệm, hoặc lên kế hoạch tích hợp SATUSEHAT, Codeverta có thể hỗ trợ từ lập bản đồ quy trình đến triển khai và hỗ trợ kỹ thuật.

Bởi vì cuối cùng, công nghệ y tế tốt không phải là công nghệ được bàn tán nhiều nhất. Công nghệ tốt là công nghệ giúp nhân viên y tế có nhiều thời gian hơn để chăm sóc con người.
